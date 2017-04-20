package com.scut.vsp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ImportResource;

@ImportResource("classpath:configs/Beans.xml")
@SpringBootApplication
public class VspsApplication {
	public static void main(String[] args) {
		SpringApplication.run(VspsApplication.class, args);
	}
}
