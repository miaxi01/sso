---
layout: default
title:  Manage system agent groups
---

In the Release Operations Center, system agents operate outside of the deployment environment. The system agent role in the deployment is to perform tasks like artifact retrieval and approval request. To ensure that agents are available to perform tasks assigned to an Agent group, assign system agents to the group.

## Add System Agent Groups
To ensure continuous agent availability during artifact retrieval and approval requests, add system agents to system agents groups.

Follow these steps:

1. Click Administration, and select Agent Group.
2. Click New, and enter the Name and Description.
3. In Group Type, select the type for the following groups:
   * Artifact Retrieval
   * Group for artifact retrieval.
   * Approval Runner
   * Group for approval gate processing.
4. In the Retrieval Agent table, select the agents for the group.

   > Note: To locate agents in a large table, use Search.

5. Click Save.

   The new group appears in the Agent Groups list.