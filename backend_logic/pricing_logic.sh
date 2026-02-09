#!/bin/bash

# Staff count passed as the first argument
STAFF_COUNT=$1

# 1. SME Check (1-10 staff)
if [ STAFF_COUNT -le 10 ]; then
    TOTAL_ZAR=499
    echo "Tier: SME"
fi

# We will add the Growth and Corporate logic next
