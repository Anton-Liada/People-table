import React, { useState } from 'react';
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from '../Button';
import { InputErrors, Status } from '../../types/enums';
import { IFormValues, IUser } from '/src/types/types';
import { addNewUser } from '/src/features/users/usersSlice';
import { useAppDispatch, useAppSelector } from '/src/features/hooks/hooks';
import { Loader } from '../Loader';
import './Modal.scss';

type Props = {
  setIsOpenModal: (value: boolean) => void;
  isAdding?: boolean;
  people?: IUser[];
};

export const Modal: React.FC<Props> = ({ setIsOpenModal, isAdding }) => {
  const {
    register,
    formState: {
      errors,
      isValid,
      isDirty,
    },
    handleSubmit,
  } = useForm<IFormValues>({ mode: 'onBlur' });

  const dispatch = useAppDispatch();
  const users = useAppSelector(state => state.users.users)
  const requestStatus = useAppSelector(state => state.users.status);
  const [addRequestStatus, setAddRequestStatus] = useState(Status.IDLE);

  const onSubmit: SubmitHandler<IFormValues> = data => data;
  const emailPattern = new RegExp('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$');
  const textPattern = new RegExp('[A-Za-z]');
  const addressPattern = new RegExp('[a-zA-Z0-9_.+-]');

  const defaultUser: IUser = {
    id: 0,
    first_name: '',
    last_name: '',
    email: '',
    address: '',
    gender: 'male',
  };

  const [newUser, setNewUser] = useState(defaultUser);

  const onChangeFirstName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewUser({ ...newUser, first_name: event.target.value });
  };

  const onChangeLastName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewUser({ ...newUser, last_name: event.target.value });
  };

  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewUser({ ...newUser, email: event.target.value });
  };

  const onChangeAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewUser({ ...newUser, address: event.target.value });
  };

  const onChangeSex = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setNewUser({ ...newUser, gender: event.target.value });
  };

  const handleCreate = async () => {
    if (isValid) {
      try {
        setAddRequestStatus(Status.SUCCEEDED)
        await dispatch(addNewUser({
          id: Math.max(...users.map(user => user.id)) + 1,
          first_name: newUser.first_name,
          last_name: newUser.last_name,
          email: newUser.email,
          address: newUser.address,
          gender: newUser.gender,
        }));

        setNewUser(defaultUser);
      } catch (error) {
        setAddRequestStatus(Status.FAILED)
      } finally {
        setAddRequestStatus(Status.IDLE);
      }
    }
  }

  const handleUpdate = async () => {
    console.log(1)
  }

  return (
    <div className="modal is-active">
      <div className="modal-background" />

      <div className="modal-card">
        <header className="modal-card-head">
          <div
            className="modal-card-title has-text-weight-medium"
          >
            {isAdding
              ? ('Create person')
              : `Update person`
            }
          </div>

          <Button
            onClick={() => setIsOpenModal(false)}
            content="close"
          />
        </header>

        <form
          className="modal-card-body"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <label className="modal-card__label">
              First Name
            </label>

            <input
              className="modal-card__input"
              placeholder='First Name'
              {...register("firstName",
                {
                  required: {
                    value: true,
                    message: InputErrors.REQUIRED,
                  },
                  minLength: {
                    value: 4,
                    message: InputErrors.MIN_LENGTH
                  },
                  pattern: {
                    value: textPattern,
                    message: InputErrors.PATTERN
                  },
                  maxLength: {
                    value: 15,
                    message: InputErrors.MAX_LENGTH
                  },
                }
              )}
              value={newUser.first_name}
              onChange={onChangeFirstName}
            />
            <div className="modal-card__message">
              {errors?.firstName && `${errors?.firstName?.message || InputErrors.ERROR}`}
            </div>
          </div>

          <div>
            <label className="modal-card__label">
              Last Name
            </label>

            <input
              className="modal-card__input"
              type="text"
              placeholder='Last Name'
              {...register("lastName",
                {
                  required: InputErrors.REQUIRED,
                  minLength: {
                    value: 4,
                    message: InputErrors.MIN_LENGTH
                  },
                  pattern: {
                    value: textPattern,
                    message: InputErrors.PATTERN
                  },
                  maxLength: {
                    value: 15,
                    message: InputErrors.MAX_LENGTH
                  },
                }
              )}
              value={newUser.last_name}
              onChange={onChangeLastName}
            />
            <div className="modal-card__message">
              {errors?.lastName && `${errors?.lastName?.message || InputErrors.ERROR}`}
            </div>
          </div>

          <div>
            <label className="modal-card__label">
              Email
            </label>

            <input
              className="modal-card__input"
              placeholder='Email'
              {...register("email",
                {
                  required: InputErrors.REQUIRED,
                  minLength: {
                    value: 4,
                    message: InputErrors.MIN_LENGTH
                  },
                  pattern: {
                    value: emailPattern,
                    message: InputErrors.PATTERN
                  },
                  maxLength: {
                    value: 30,
                    message: InputErrors.MAX_LENGTH
                  },
                }
              )}
              value={newUser.email}
              onChange={onChangeEmail}
            />
            <div className="modal-card__message">
              {errors?.email && `${errors?.email?.message || InputErrors.ERROR}`}
            </div>
          </div>

          <div>
            <label className="modal-card__label">
              Adress
            </label>

            <input
              className="modal-card__input"
              placeholder='Addres'
              {...register("address",
                {
                  required: InputErrors.REQUIRED,
                  minLength: {
                    value: 4,
                    message: InputErrors.MIN_LENGTH
                  },
                  pattern: {
                    value: addressPattern,
                    message: InputErrors.PATTERN
                  },
                  maxLength: {
                    value: 30,
                    message: InputErrors.MAX_LENGTH
                  },
                }
              )}
              value={newUser.address}
              onChange={onChangeAddress}
            />
            <div className="modal-card__message">
              {errors?.address && `${errors?.address?.message || InputErrors.ERROR}`}
            </div>
          </div>

          <div className="modal-card__footer">
            <div>
              <label className="modal-card__label">
                Gender
              </label>

              <select
                className="modal-card__select"
                value={newUser.gender}
                onChange={onChangeSex}>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            {isAdding
              ? (<Button onClick={handleCreate} content="add person" />)
              : (<Button onClick={handleUpdate} content="edit person" />)
            }
          </div>
        </form>
      </div>
    </div>
  );
};