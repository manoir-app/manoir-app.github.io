---
id: kubernetes
title: Kubernetes Deployment
---

# Kubernetes Deployment

MaNoir is also being prepared for a Kubernetes deployment target.

## Positioning

This target is intended for users who prefer operating MaNoir on a small self-hosted cluster, such as a lightweight Kubernetes distribution running at home.

It is not presented as a higher-tier installation model than Docker. It is simply a different operational preference.

## Expected direction

The Kubernetes deployment path is expected to cover:

- the Gaia control component
- the shared platform services required for first boot
- persistent volumes for runtime data
- secret injection for the required MaNoir runtime values
- plugin-oriented deployment convergence

## What will differ from Docker

Compared with the current Docker flow, the Kubernetes target will likely shift:

- container startup details into manifests or Helm values
- host path decisions into persistent volume choices
- environment-variable wiring into Kubernetes secrets and config maps
- single-host port publishing into cluster networking choices

## Current documentation status

This page is intentionally present from the start so the installation guide can describe Docker and Kubernetes as two self-hosted deployment targets.

Detailed Kubernetes installation steps will be added as the next version formalizes that support.