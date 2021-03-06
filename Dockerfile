FROM node
COPY ./ /fair_game/
MAINTAINER qipeng.cai@castbox.fm
RUN cd /fair_game/&& npm install && npm run build && npm install -g yarn 
CMD cd /fair_game/ && yarn run serve
EXPOSE 18080  
