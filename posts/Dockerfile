FROM node:alpine

##### Vector Proxy #######################
ENV http_proxy 'http://gateway.zscloud.net:10402'
ENV https_proxy 'http://gateway.zscloud.net:10402'
ENV no_proxy 'localhost,127.0.0.1,.vi.vector.int,.vector.int,.vector.com,.docker.internal'

RUN mkdir /tmp/certs
ADD https://vistradpart1.vi.vector.int/artifactory/adp-globaltools-generic-prod/Vector_Root_2.0.crt /tmp/certs
ADD https://vistradpart1.vi.vector.int/artifactory/adp-globaltools-generic-prod/Vector_Issuing_2.0.crt /tmp/certs

RUN cp /tmp/certs/Vector_Root_2.0.crt /usr/local/share/ca-certificates
RUN cp /tmp/certs/Vector_Issuing_2.0.crt /usr/local/share/ca-certificates
RUN apk add ca-certificates &&\
    update-ca-certificates

RUN mkdir /usr/share/ca-certificates/extra &&\
    cat /tmp/certs/Vector_Root_2.0.crt /tmp/certs/Vector_Issuing_2.0.crt > /usr/share/ca-certificates/extra/Vector_2.0.crt

ENV NODE_EXTRA_CA_CERTS /usr/share/ca-certificates/extra/Vector_2.0.crt

##### Vector Proxy done ####################


WORkDIR /app

COPY package.json ./
RUN npm install
COPY ./ ./

CMD ["npm", "start"]
