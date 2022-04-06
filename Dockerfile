FROM debian

COPY . /app
WORKDIR /app

RUN apt-get update
RUN apt install -y libcurl4
RUN apt install -y wget

RUN wget "https://repo.mongodb.org/apt/ubuntu/dists/bionic/mongodb-org/5.0/multiverse/binary-amd64/mongodb-org-server_5.0.6_amd64.deb"
RUN dpkg -i ./mongodb-org-server_5.0.6_amd64.deb

RUN apt install -y nodejs npm
RUN npm i -g @angular/cli

CMD dir; mongod & cd backend; dir; node index.js & cd ..; cd frontend; dir; cd playthrough-list; dir; ng serve --port=80 --host 0.0.0.0 --disable-host-check;