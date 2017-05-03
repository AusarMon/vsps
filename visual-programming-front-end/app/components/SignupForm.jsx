import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { createForm } from 'react-validation-form';
import FormItem from './FormItem';
import UnderlineInput from './UnderlineInput';
import Button from './Button';
import '../../styles/login.scss';
import '../../styles/link.scss';

const propTypes = {
  form: PropTypes.object,
  onSubmit: PropTypes.func,
};

class SignupForm extends Component {
  render() {
    return (
      <form className="vp-login" autoComplete={false}>
        <FormItem>
          <UnderlineInput
            placeholder="用户名"
            {...this.props.form.getInputProps('username', {
              initialValue: '',
              onlyFirst: true,
              validates: [
                {
                  rules: [{
                    required: true,
                  }],
                  trigger: ['onChange', 'onBlur'],
                },
              ],
            })}
          />
        </FormItem>
        <FormItem>
          <UnderlineInput
            placeholder="邮箱"
            {...this.props.form.getInputProps('email', {
              initialValue: '',
              onlyFirst: true,
              validates: [
                {
                  rules: [{
                    required: true,
                  }],
                  trigger: ['onChange', 'onBlur'],
                },
              ],
            })}
          />
        </FormItem>
        <FormItem>
          <UnderlineInput
            type="password"
            placeholder="密码"
            {...this.props.form.getInputProps('password', {
              initialValue: '',
              onlyFirst: true,
              validates: [
                {
                  rules: [{
                    required: true,
                  }],
                  trigger: ['onChange', 'onBlur'],
                },
              ],
            })}
          />
        </FormItem>
        <FormItem>
          <UnderlineInput
            type="password"
            placeholder="确认密码"
            {...this.props.form.getInputProps('passwordConfirm', {
              initialValue: '',
              onlyFirst: true,
              validates: [
                {
                  rules: [{
                    required: true,
                  }, {
                    validator: (value, rule, formdata, callback) => {
                      const { password } = formdata;
                      if (value !== password) {
                        callback(new Error('两次输入的密码必须一致'));
                      } else {
                        callback();
                      }
                    },
                  }],
                  trigger: ['onChange', 'onBlur'],
                },
              ],
            })}
          />
        </FormItem>
        <Button
          type="hollow"
          radius
          style={{
            width: '100px',
            display: 'block',
            margin: '24px 0 16px 0',
          }}
          onClick={(e) => {
            e.preventDefault();
            this.props.form.validateAllInputs((err, namevalues) => {
              this.props.onSubmit(namevalues);
            });
          }}
        >
        注册
        </Button>
        <Link className="vp-link" to="/login">登录</Link>
      </form>
    );
  }
}

SignupForm.propTypes = propTypes;

export default createForm(SignupForm);
