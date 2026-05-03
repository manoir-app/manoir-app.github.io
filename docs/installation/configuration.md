---
id: configuration
title: Configuration
---

# Configuration

This page describes the shared configuration concepts used by the current self-hosted installation flow.

## Runtime secrets

Gaia requires three secrets at runtime:

- HOMEAUTOMATION_APIKEY
- HOMEAUTOMATION_SECRETS_SALT
- HOMEAUTOMATION_AUTH_JWT_SIGNING_KEY

These values are required before Gaia can inspect, deploy, or refresh services.

## Gaia options

The Gaia host currently exposes the following application settings:

- Gaia__SharedServicesRootPath
- Gaia__PluginRepositoriesRootPath
- Gaia__AutoEnsureSharedServicesOnStartup
- Gaia__EnsureIntervalSeconds

In the current Docker flow, these values are usually injected through environment variables.

## Docker-specific environment variables

The current Docker bootstrap also relies on a few operational settings:

- MANOIR_CORE_ADMINUI_HOST_PORT to choose which host port exposes the Core Admin UI
- MANOIR_SHARED_SERVICES_HOST_ROOT_PATH to pass the host-visible shared-services path to the runtime
- MANOIR_DEVELOPMENT_INSTANCE to enable a development-oriented local layout

## Suggested documentation strategy

For the public installation guide, configuration should be explained in two layers:

1. Shared MaNoir runtime concepts such as secrets, roots, and plugin discovery
2. Deployment-target-specific configuration for Docker first, and Kubernetes later

This avoids mixing product concepts with container runtime details.
