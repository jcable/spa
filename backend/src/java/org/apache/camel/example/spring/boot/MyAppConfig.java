package org.apache.camel.example.spring.boot;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.apache.camel.CamelContext;
import org.apache.camel.spring.SpringCamelContext;
import org.apache.camel.spring.boot.CamelContextConfiguration;

@Configuration
public class MyAppConfig {

  @Bean
  CamelContextConfiguration contextConfiguration() {
    return new CamelContextConfiguration() {
      @Override
	public
      void beforeApplicationStart(CamelContext context) {
	    	  SpringCamelContext springCamelContext = (SpringCamelContext) context;
	    	  springCamelContext.setName("camel-example-spring-boot");
      }
    };
  }

}