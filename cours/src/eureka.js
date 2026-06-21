const { Eureka } = require('eureka-js-client');

function createEurekaClient(port) {
  return new Eureka({
    instance: {
      app: process.env.SERVICE_NAME || 'COURS',
      hostName: process.env.SERVICE_HOST || 'localhost',
      ipAddr: process.env.SERVICE_HOST || '127.0.0.1',
      instanceId: `${process.env.SERVICE_NAME || 'COURS'}:${process.env.SERVICE_HOST || 'localhost'}:${port}`,
      statusPageUrl: `http://${process.env.SERVICE_HOST || 'localhost'}:${port}/health`,
      healthCheckUrl: `http://${process.env.SERVICE_HOST || 'localhost'}:${port}/health`,
      homePageUrl: `http://${process.env.SERVICE_HOST || 'localhost'}:${port}`,
      port: {
        '$': port,
        '@enabled': true,
      },
      vipAddress: process.env.SERVICE_NAME || 'COURS',
      secureVipAddress: process.env.SERVICE_NAME || 'COURS',
      dataCenterInfo: {
        '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
        name: 'MyOwn',
      },
    },
    eureka: {
      host: process.env.EUREKA_HOST || 'localhost',
      port: Number(process.env.EUREKA_PORT || 8761),
      servicePath: '/eureka/apps/',
    },
  });
}

module.exports = {
  createEurekaClient,
};
