# Instructions to set up the workspace

First clone the repository in a folder of your choice:

<code>git clone https://gitlab.propulsion-home.ch/full-stack/batch-9-september-2019/group-projects/phoenix.git</code>

Then change to the <code>development</code> branch and create a new branch for the feature you want to develop:

<code>git checkout development</code>

<code>git checkout -b feature-name</code>

Remember to NEVER push to the <code>master</code> or <code>development</code> branches directly!!

If the docker images are in the registry, simply type the following in your terminal inside of the root folder (phoenix/)

<code>docker-compose up</code>

In case the docker images are not in the registry, you will need to build the images first:

<code>docker build -f Dockerfile_backend -t backend .</code>

<code>docker build -f Dockerfile_frontend -t frontend .</code>

... and then:

<code>docker-compose up</code>

You should now be able to run the setup in your local machine and connect to the containers through ssh.

If you are going to develop locally instead, remember to install the dependencies:

Frontend (from the frontend folder): 
<code>npm install</code>

Backend (from the ROOT folder, with the environment ACTIVATED): 
<code>pip install -r requirements.txt</code>

Let's code!!
