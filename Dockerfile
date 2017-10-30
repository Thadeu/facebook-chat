FROM ruby:2.3.1
MAINTAINER Thadeu Esteves Jr <eu@thadeuesteves.com.br>

# libs essentials
RUN apt-get update && apt-get install -y \ 
  build-essential \ 
  libpq-dev \
  postgresql-client-9.4 \
  libxml2-dev \
  libxslt1-dev

# Node.js
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash - \
&& apt-get install -y nodejs

RUN apt-get update && apt-get install -y curl apt-transport-https wget && \
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
apt-get update && apt-get install -y yarn

RUN export TZ=America/Araguaina

RUN mkdir -p /app 
WORKDIR /app

RUN bundle config github.https true

COPY Gemfile ./ 
RUN gem install bundler && bundle install --jobs 20 --retry 5
COPY Gemfile.lock ./

COPY . ./
EXPOSE 3000