package com.scut.vsp.mapper;

import com.scut.vsp.model.Program;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.Assert.*;

/**
 * Created by ASH on 2016/11/25.
 */

@RunWith(SpringRunner.class)
@SpringBootTest
public class ProgramMapperTest {

    @Autowired ProgramMapper programMapper;

    @Test
    public void testFindProgramByUsername() {
        Program expect = new Program("p_id", "test", "test_p", "<test/>");
        Program program = programMapper.findByUsername(expect.getUsername());
        assertEquals(expect, program);
    }

    @Test
    public void testInsert() {
        Program expect = new Program("p_id1", "test", "test_p", "<test/>");
        programMapper.insert(expect);
        Program p = programMapper.findById(expect.getProgramId());
        assertEquals(expect, p);
        programMapper.deleteByProgramId(expect.getProgramId());
    }

    @Test
    public void testFindAllProgtamBasicInfoByUsername() {
        System.out.println(programMapper.findProgtamBasicInfoByUsername("test"));
    }

    @Test
    public void testUpdate() {
        Program expect = new Program("p_id1", "test", "new name", "new struct");
        programMapper.update(expect);
        Program program = programMapper.findById(expect.getProgramId());
        assertEquals(expect, program);
    }

}
