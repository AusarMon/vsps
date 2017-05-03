package com.scut.vsp.config.security;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.scut.vsp.config.security.json.JsonAuthenticationProvider;
import com.scut.vsp.config.security.json.JsonLoginProcessingFilter;
import com.scut.vsp.config.security.jwt.JwtAuthenticationProvider;
import com.scut.vsp.config.security.jwt.JwtTokenAuthenticationProcessingFilter;
import com.scut.vsp.config.security.jwt.SkipPathRequestMatcher;
import com.scut.vsp.config.security.jwt.extractor.TokenExtractor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;
import java.util.List;

/**
 * Created by ASH on 2016/11/18.
 */

@EnableWebSecurity
@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    public static final String JWT_TOKEN_HEADER_PARAM = "X-Authorization";

    // 以下路径要在 List<String> pathsToSkip = Arrays.asList 中添加，不然无法跳过验证
    public static final String FORM_BASED_LOGIN_ENTRY_POINT = "/v1/auth/login/";
    public static final String FORM_BASED_REGISTER_ENTRY_POINT = "/v1/user/reg/";
    public static final String TOKEN_REFRESH_ENTRY_POINT = "/v1/auth/token/";
    public static final String GEN_PROGRAM_ENTRY_POINT = "/v1/program/gen/**";
    public static final String HOME_ENTRY_POINT = "/";
    public static final String INDEX_ENTRY_POINT = "/**/index**";
    public static final String JS_ENTRY_POINT = "/**/app**";

    public static final String TOKEN_BASED_AUTH_ENTRY_POINT = "/**";

    @Autowired private RESTAuthenticationEntryPoint restAuthenticationEntryPoint;
    @Autowired private AuthenticationSuccessHandler successHandler;
    @Autowired private AuthenticationFailureHandler failureHandler;
    @Autowired private JsonAuthenticationProvider authenticationProvider;
    @Autowired private JwtAuthenticationProvider jwtAuthenticationProvider;
    @Autowired private TokenExtractor tokenExtractor;
    @Autowired private AuthenticationManager authenticationManager;
    @Autowired private ObjectMapper objectMapper;

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Bean
    protected BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    protected JsonLoginProcessingFilter buildJsonLoginProcessingFilter() throws Exception {
        JsonLoginProcessingFilter filter = new JsonLoginProcessingFilter(FORM_BASED_LOGIN_ENTRY_POINT,
                successHandler, failureHandler, objectMapper);
        filter.setAuthenticationManager(this.authenticationManager);
        return filter;
    }

    @Bean
    protected JwtTokenAuthenticationProcessingFilter buildJwtTokenAuthenticationProcessingFilter() throws Exception {
        List<String> pathsToSkip = Arrays.asList(
                TOKEN_REFRESH_ENTRY_POINT,
                FORM_BASED_LOGIN_ENTRY_POINT,
                FORM_BASED_REGISTER_ENTRY_POINT,
                GEN_PROGRAM_ENTRY_POINT,
                HOME_ENTRY_POINT,
                INDEX_ENTRY_POINT,
                JS_ENTRY_POINT);
        SkipPathRequestMatcher matcher = new SkipPathRequestMatcher(pathsToSkip, TOKEN_BASED_AUTH_ENTRY_POINT);
        JwtTokenAuthenticationProcessingFilter filter
                = new JwtTokenAuthenticationProcessingFilter(failureHandler, tokenExtractor, matcher);
        filter.setAuthenticationManager(this.authenticationManager);
        return filter;
    }

    @Bean
    public CorsFilter corsFilter() {
        final UrlBasedCorsConfigurationSource urlBasedCorsConfigurationSource = new UrlBasedCorsConfigurationSource();
        final CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.setAllowCredentials(true);
        corsConfiguration.addAllowedOrigin("*");
        corsConfiguration.addAllowedHeader("*");
        corsConfiguration.addAllowedMethod("*");
        urlBasedCorsConfigurationSource.registerCorsConfiguration("/**", corsConfiguration);
        return new CorsProcessingFilter(urlBasedCorsConfigurationSource);
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(authenticationProvider);
        auth.authenticationProvider(jwtAuthenticationProvider);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable() // We don't need CSRF for JWT based authentication
                .exceptionHandling()
                .authenticationEntryPoint(restAuthenticationEntryPoint)

                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)

                .and()
                .authorizeRequests()
                .antMatchers(GEN_PROGRAM_ENTRY_POINT).permitAll() // Generate program
                .antMatchers(FORM_BASED_LOGIN_ENTRY_POINT).permitAll() // Login end-point
                .antMatchers(FORM_BASED_REGISTER_ENTRY_POINT).permitAll() // User register
                .antMatchers(TOKEN_REFRESH_ENTRY_POINT).permitAll() // Token refresh end-point
                .antMatchers(HOME_ENTRY_POINT).permitAll()
                .antMatchers(INDEX_ENTRY_POINT).permitAll()
                .antMatchers(JS_ENTRY_POINT).permitAll()


                .and()
                .authorizeRequests()
                .antMatchers(TOKEN_BASED_AUTH_ENTRY_POINT).authenticated() // Protected API End-points

                .and()
                .addFilterBefore(corsFilter(), UsernamePasswordAuthenticationFilter.class)
                .addFilterBefore(buildJsonLoginProcessingFilter(), UsernamePasswordAuthenticationFilter.class)
                .addFilterBefore(buildJwtTokenAuthenticationProcessingFilter(), UsernamePasswordAuthenticationFilter.class);
    }
}
