package com.scut.vsp.config.security.jwt.extractor;

/**
 * Created by ASH on 2016/11/18.
 */
public interface TokenExtractor {
    public String extract(String payload);
}
