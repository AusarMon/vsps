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

class PasswordForm extends Component {
  render() {
    return (
      <form className="vp-login" autoComplete={false}>
        <FormItem>
          <UnderlineInput
            placeholder="密码"
            type="password"
            {...this.props.form.getInputProps('oldPassword', {
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
            placeholder="新密码"
            type="password"
            {...this.props.form.getInputProps('newPassword', {
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
                      const { newPassword } = formdata;
                      if (value !== newPassword) {
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
        修改密码
        </Button>
      </form>
    );
  }
}

PasswordForm.propTypes = propTypes;

export default createForm(PasswordForm);
