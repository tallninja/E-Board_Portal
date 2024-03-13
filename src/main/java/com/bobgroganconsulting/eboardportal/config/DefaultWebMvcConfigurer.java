/**
 * Author: Ernest Wambua
 * Email: ernestwambua2@gmail.com
 * Date: 3/13/24 : 7:31 PM
 */
package com.bobgroganconsulting.eboardportal.config;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.PathResourceResolver;
import org.springframework.web.servlet.resource.ResourceResolverChain;

import java.util.List;

/*
* By default, Spring tries to find a request method or resource that matches with the path
* (or eventually falls to index.html resource at the path). What does it mean? It means if
* we go to http://localhost:8080/path/to/some/page, it will not eventually show the path to
* our web app, which is an issue if we want to have URL routing control defined in our web
* app, like with React Router library.
*
* Thankfully, we can solve it by the configuration below.
* */

@Configuration
public class DefaultWebMvcConfigurer implements WebMvcConfigurer {
    // Register resource handler for all paths,
    // get resources from classpath:/static/,
    // use IndexFallbackResourceResolver for that
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry
                .addResourceHandler("/**")
                .addResourceLocations("classpath:/static/")
                .resourceChain(true)
                .addResolver(new IndexFallbackResourceResolver());
    }

    static class IndexFallbackResourceResolver extends PathResourceResolver {
        @Override
        protected Resource resolveResourceInternal(
                HttpServletRequest request,
                String requestPath,
                List<? extends Resource> locations,
                ResourceResolverChain chain
        ) {
            // Give PathResourceResolver a chance to resolve a resource on its own.
            Resource resource = super.resolveResourceInternal(request, requestPath, locations, chain);

            // If resource wasn't found, use index.html file.
            if (resource == null) {
                resource = super.resolveResourceInternal(request, "index.html", locations, chain);
            }
            return resource;
        }
    }
}
