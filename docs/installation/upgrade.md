---
id: upgrade
title: Upgrade
---

# Upgrade

This page describes how to upgrade an existing MaNoir installation to a newer version.

## Scope

Upgrade guidance will be split by deployment target.

The current Docker-based flow will document:

- updating the Gaia image
- restarting Gaia safely
- refreshing core and shared service images
- handling plugin refreshes

The future Kubernetes flow will document:

- applying updated manifests or Helm values
- rolling restart expectations
- persistence and secret handling during upgrades

Until the target-specific procedures are written, treat upgrades as an operational task that should be rehearsed on a non-critical self-hosted environment first.
