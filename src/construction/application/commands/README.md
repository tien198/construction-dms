#

Merge both RequestDTO and Command into one
To reduce layer convert boiler plate code

That path lead to command was Framework as Detail (Framework Coupling)
we seperate the primitive command to ./type folder for decouple in future if it's necessary

--- [note] ---
it need to be splited,in case growing complicated

1. RequestDTO -- infra/inbound/request-dto
2. Command -- application/commands
