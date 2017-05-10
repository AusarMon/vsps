package com.scut.vsp.service;

import com.scut.vsp.code.evaluation.model.EvaluationResult;
import com.scut.vsp.model.Solution;

/**
 * Created by HL on 09/05/2017.
 */
public interface EvaluationServiceProviderInterface {
    EvaluationResult evaluate(Solution solution);
}
