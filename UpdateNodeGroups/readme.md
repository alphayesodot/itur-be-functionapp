# QueueTrigger - TypeScript

The `UpdateNodeGroups` gets an unit id, an array field name (owners/interviewers/nodes) and an item that have been removed from that unit, from the queue, and updates the NodeGroups objects in the DB- removes that item from their array fields.