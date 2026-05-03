---
id: deployment
title: Docker Deployment
---

import DockerRunCommandBuilder from '@site/src/components/DockerRunCommandBuilder';

# Docker Deployment

This page covers the current Docker-based installation flow for MaNoir.

## Overview

The current self-hosted bootstrap path is driven by Gaia from Manoir.Ops.

Gaia runs as a container, inspects the local Docker runtime, ensures the minimum required platform services, and keeps the runtime converged over time.

## What gets started

On the first successful run, Gaia ensures:

- MongoDB
- NATS
- MQTT
- Redis
- The MaNoir Core Admin UI

It can also discover plugin repositories and restart plugin workloads when those repositories contain a valid manoir.plugin.yaml manifest.

## Quick start

The current Docker installation path is straightforward:

1. Prepare a host that can run Docker with Linux containers.
2. Choose a persistent home-automation root on the host.
3. Provide the required Gaia secrets.
4. Start the Gaia container.
5. Verify that Gaia bootstrapped the shared services and the Core Admin UI.

## Interactive command builder

Use the builder below to generate a docker run command that matches the current Gaia helper script.

<DockerRunCommandBuilder />

The builder intentionally uses placeholder secret values. Replace them with real runtime values before starting the container.

When a Linux target is selected, the generated script also prepares the host directories with `sudo mkdir -p` before starting the container.

When `Linux on Raspberry Pi < 5` is selected, the generated script additionally sets `MANOIR_MONGO_IMAGE=mongo:4.4.18` to force a MongoDB image compatible with older Raspberry Pi hardware.

## Installation flow

### 1. Prepare the host

Make sure Docker is available and configured to run Linux containers.

Create or choose a persistent home-automation root on the host. The current helper flow uses:

- ProgramData/MaNoir/home-automation on Windows
- /srv/manoir/home-automation on Linux

### 2. Provide the required secrets

Before starting Gaia, prepare values for:

- HOMEAUTOMATION_APIKEY
- HOMEAUTOMATION_SECRETS_SALT
- HOMEAUTOMATION_AUTH_JWT_SIGNING_KEY

These values are mandatory.

The salt must be valid Base64 and decode to at least 16 bytes. The JWT signing key must contain at least 32 characters.

### 3. Start the Gaia container

The local helper script in Manoir.Ops builds a docker run command around these principles:

- publish the Gaia web UI on a host port
- mount the Docker socket
- mount the persistent home-automation root into the container
- inject the required secrets and Gaia settings through environment variables

A representative example looks like this:

```bash
docker run --detach \
	--name manoir-agents-gaia \
	--restart unless-stopped \
	--publish 5056:8080 \
	--mount type=bind,source=/var/run/docker.sock,target=/var/run/docker.sock \
	--mount type=bind,source=/srv/manoir/home-automation,target=/home-automation \
	--env ASPNETCORE_URLS=http://0.0.0.0:8080 \
	--env DOCKER_HOST=unix:///var/run/docker.sock \
	--env HOMEAUTOMATION_APIKEY=replace-me \
	--env HOMEAUTOMATION_SECRETS_SALT=replace-me \
	--env HOMEAUTOMATION_AUTH_JWT_SIGNING_KEY=replace-me \
	--env MANOIR_CORE_ADMINUI_HOST_PORT=81 \
	--env MANOIR_SHARED_SERVICES_HOST_ROOT_PATH=/srv/manoir/home-automation/shared-services \
	--env Gaia__SharedServicesRootPath=/home-automation/shared-services \
	--env Gaia__PluginRepositoriesRootPath=/home-automation/plugins \
	--env Gaia__EnsureIntervalSeconds=300 \
	--env Gaia__AutoEnsureSharedServicesOnStartup=true \
	ghcr.io/manoir-app/manoir-agents-gaia:latest
```

The exact image reference may differ depending on whether you build Gaia locally or use a published image.

### Windows hosts

For Windows hosts, the recommended baseline is Docker Desktop running Linux containers.

Use these conventions unless you have a reason to override them:

- Host root: C:\ProgramData\MaNoir\home-automation
- Docker socket source: /var/run/docker.sock
- Shell: PowerShell

Even on Windows, the Gaia container itself remains Linux-based. That is why the container paths stay under /home-automation.

### Linux hosts

For Linux hosts, the default runtime root is usually /srv/manoir/home-automation.

Use these conventions unless you have a reason to override them:

- Host root: /srv/manoir/home-automation
- Docker socket source: /var/run/docker.sock
- Shell: bash or another shell that can run Docker commands

Make sure the user starting Gaia has permission to talk to the Docker daemon.

### 4. Verify the bootstrap

After startup, verify:

- the Gaia web UI responds
- the Docker containers for shared services are running
- the Core Admin UI is reachable on the configured host port

## Post-installation checklist

Use this checklist after the first startup:

- The Gaia container is in a running state and does not restart continuously.
- The Gaia web UI answers on the configured web port.
- The shared service containers exist for MongoDB, NATS, MQTT, and Redis.
- The Core Admin UI is reachable on the configured host port.
- The shared-services directory was created under the chosen home-automation root.
- The MQTT configuration file was generated under shared-services/mqtt/config.
- The plugins directory exists under the same home-automation root.
- Gaia logs do not show missing secret errors.

## Troubleshooting signals

The first things to inspect when the bootstrap does not converge are:

- Docker is unavailable from the Gaia container.
- One of the required secrets is missing or invalid.
- The chosen host ports are already in use.
- The mounted home-automation root is not writable or points to the wrong location.
- The Gaia image reference does not exist locally and cannot be pulled.

### 5. Add plugins later

Plugin repositories are expected under the plugins root. Gaia can inspect those repositories, load manoir.plugin.yaml, and apply the related Docker deployment plan.

This makes Docker the current operational entry point not only for the base platform, but also for plugin lifecycle management.
