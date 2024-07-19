# Use an official Ubuntu base image
FROM ubuntu

# Update and install iputils-ping
RUN apt-get update && apt-get install -y iputils-ping

# Set the entrypoint to bash for interactive mode
ENTRYPOINT ["/bin/bash"]
