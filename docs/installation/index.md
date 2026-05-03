---
id: index
title: Self-Hosted Installation
sidebar_label: Overview
slug: /installation
---

# Self-Hosted Installation

MaNoir is designed to be self-hosted on infrastructure you control.

This section explains how to install and operate MaNoir at home, in a homelab, or on a small private server.

## Deployment targets

MaNoir is being documented around two self-hosted deployment targets:

- Docker for a straightforward single-host setup
- Kubernetes for users who already prefer running a small cluster at home

The choice is primarily about operational preference, not about enterprise-style deployment tiers.

Today, the most concrete installation path is based on Gaia, the platform bootstrap and runtime convergence agent provided by Manoir.Ops. Gaia starts the minimum required services, checks the local runtime, and converges the system toward the expected state.

## What Gaia bootstraps

In the current Docker-based flow, Gaia ensures the platform's minimum vital services:

- Shared infrastructure services: MongoDB, NATS, MQTT, and Redis
- The MaNoir Core Admin UI
- Plugin deployments discovered from the plugin repositories root

This means the installation guide is centered on starting Gaia correctly, providing its required secrets, and mounting persistent storage in the expected locations.

## Sections

- [Requirements](/docs/installation/requirements) – Hardware and software prerequisites
- [Configuration](/docs/installation/configuration) – Shared runtime settings and secrets
- [Docker deployment](/docs/installation/deployment) – Current step-by-step Docker installation path
- [Kubernetes deployment](/docs/installation/kubernetes) – Initial guidance for small-cluster deployments
- [Upgrade](/docs/installation/upgrade) – How to upgrade an existing installation
