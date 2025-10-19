#!/usr/bin/env bash
set -euo pipefail
git fetch upstream
git checkout main && git reset --hard upstream/main && git push -f origin main
git checkout product/main
git rebase upstream/main || { echo "Resolve conflicts, then: git rebase --continue"; exit 1; }
git push --force-with-lease origin product/main
