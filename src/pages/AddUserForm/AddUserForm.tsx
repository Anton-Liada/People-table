import React, { useState } from 'react'
import { InputErrors, Status } from '../../types/enums'
import { SubmitHandler, useForm } from "react-hook-form";
import { IFormValues, IUser } from '../../types/types';
import { useAppDispatch, useAppSelector } from '../../features/hooks/hooks';
import { addNewUser } from '../../features/users/usersSlice';
import { Loader } from '../../components/Loader';

export const AddUserForm: React.FC = () => {
  const {
    register,
    formState: {
      errors,
      isValid,
      isDirty,
    },
    handleSubmit,
  } = useForm<IFormValues>({ mode: 'onChange' });

  const dispatch = useAppDispatch();
  const users = useAppSelector(state => state.users.users)
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

  return (
    <>
      <h2>Add User Form</h2>

      {addRequestStatus === Status.LOADING && <Loader />}

      <form onSubmit={handleSubmit(onSubmit)}>
        {!(addRequestStatus === Status.LOADING) && (
          <div className="form-wrapper">
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
                      value: 6,
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

              <button onClick={handleCreate} type="submit">
                Add User
              </button>

            </div>
          </div>)
        }
      </form>

      {addRequestStatus === Status.SUCCEEDED && <p>User was added</p>}

      {addRequestStatus === Status.FAILED && <p>Something went wrong</p>}
    </>
  )
}
