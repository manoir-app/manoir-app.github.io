---
id: requirements
title: Requirements
---

# Requirements

This page describes the baseline requirements for running a self-hosted MaNoir installation.

## Supported deployment styles

MaNoir is being prepared for two deployment styles:

- Docker on a single host
- Kubernetes on a small self-hosted cluster

The current implementation is Docker-first, but the requirements below were written to stay compatible with both targets where possible.

## Host requirements

You need a machine or small cluster that can run Linux containers and keep persistent application data.

Recommended baseline:

- 4 CPU cores
- 8 GB RAM
- 20 GB of free disk space for images, volumes, logs, and persistent data
- A persistent filesystem location for the MaNoir runtime root

For a small home setup, these values are a practical starting point rather than a hard limit.

## Software requirements

For the current Docker installation flow, you need:

- Docker with Linux container support
- A shell environment able to run Docker commands
- Network access to pull container images

If you plan to use the local helper scripts from Manoir.Ops, you also need:

- PowerShell 7 or Windows PowerShell on Windows
- .NET SDK if you want to build the Gaia image locally instead of using a prebuilt image

## Required secrets

Gaia requires three runtime secrets before it can deploy or refresh services:

- HOMEAUTOMATION_APIKEY
- HOMEAUTOMATION_SECRETS_SALT
- HOMEAUTOMATION_AUTH_JWT_SIGNING_KEY

The salt must be valid Base64 and decode to at least 16 bytes. The JWT signing key must contain at least 32 characters.

## Persistent storage layout

The runtime expects a persistent root directory named home-automation. Under that root, the current Docker flow uses at least:

- shared-services for shared runtime data and generated files
- plugins for plugin repositories and manifests

On Windows, the default local root used by Manoir.Ops is under ProgramData/MaNoir/home-automation.

On Linux, the default local root is /srv/manoir/home-automation.

## Network and ports

The current Docker bootstrap uses or exposes the following ports by default:

- 5056 for the Gaia web UI in the local helper script
- 81 for the Core Admin UI host port
- 1883 for MQTT
- 27017 for MongoDB in development-oriented setups
- 4222 for NATS in development-oriented setups

Make sure these ports fit your local network setup before deployment.
