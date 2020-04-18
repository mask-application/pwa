# node:12 image based on Debian
FROM library/node:12 as builder

WORKDIR /app

ADD package.json yarn.lock ./
RUN yarn install

ADD ./ ./
RUN yarn build


FROM library/nginx
COPY --from=builder /app/build/ /app/
COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN rm -rf /app/static/js/*.map

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]