package com.scut.vsp.service;

import com.scut.vsp.code.evaluation.model.EvaluationResult;
import com.scut.vsp.model.Solution;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by HL on 09/05/2017.
 */

@Service
public class EvaluationService {

    @Autowired
    EvaluationServiceProviderInterface evaluationServiceProvider;

    public EvaluationResult evaluate(Solution solution) {
        return evaluationServiceProvider.evaluate(solution);
    }
}
