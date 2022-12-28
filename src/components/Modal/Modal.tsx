import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../features/hooks/hooks';
import { addNewUser, updateUser } from '../../features/users/usersSlice';
import { InputErrors } from '../../types/enums';
import { IUser } from '../../types/types';
import { Button } from '../Button';
import { IconClose } from '../Icons/IconClose';
import './Modal.scss';

type Props = {
  setIsOpenModal: (value: boolean) => void;
  isAdding?: boolean;
  user?: IUser | null;
};

export const Modal: React.FC<Props> = ({ setIsOpenModal, isAdding, user }) => {
  const users = useAppSelector(state => state.users.users);
  const dispatch = useAppDispatch();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IUser>({
    mode: 'onChange',
    defaultValues: {
      id: user?.id || Math.max(...users.map(user => user.id)) + 1,
      first_name: user?.first_name || '',
      last_name: user?.last_name || '',
      email: user?.email || '',
      address: user?.address || '',
      gender: user?.gender || 'male',
    },
  });

  const onSubmit: SubmitHandler<IUser> = async (data) => {
    setIsOpenModal(false)
    console.log('data', data)
    if (!isAdding) {
      return await dispatch(updateUser(data));
    }

    return await dispatch(addNewUser(data));
  };

  const textPattern = new RegExp('^[a-zA-Z]+(?:\\s+[a-zA-Z]+)*$');
  const addressPattern = new RegExp('[a-zA-Z0-9_.+-]');
  const emailPattern = new RegExp(
    '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$'
  );

  return (
    <div className="modal is-active">
      <div className="modal-background" />

      <div className="modal-card">
        <header className="modal-card-head">
          <div className="modal-card-title has-text-weight-medium">
            {isAdding ? 'Create person' : `Update person`}
          </div>

          <Button
            onClick={() => setIsOpenModal(false)}
            icon={<IconClose />}
            isClose={true}
          />
        </header>

        <form className="modal-card-body" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="modal-card__label">First Name</label>

            <input
              className="modal-card__input"
              placeholder="First Name"
              {...register('first_name', {
                required: {
                  value: true,
                  message: InputErrors.REQUIRED,
                },
                minLength: {
                  value: 4,
                  message: InputErrors.MIN_LENGTH,
                },
                pattern: {
                  value: textPattern,
                  message: InputErrors.PATTERN,
                },
                maxLength: {
                  value: 15,
                  message: InputErrors.MAX_LENGTH,
                },
              })}
            />
            <div className="modal-card__message">
              {errors?.first_name &&
                `${errors?.first_name?.message || InputErrors.ERROR}`}
            </div>
          </div>

          <div>
            <label className="modal-card__label">Last Name</label>

            <input
              className="modal-card__input"
              type="text"
              placeholder="Last Name"
              {...register('last_name', {
                required: InputErrors.REQUIRED,
                minLength: {
                  value: 4,
                  message: InputErrors.MIN_LENGTH,
                },
                pattern: {
                  value: textPattern,
                  message: InputErrors.PATTERN,
                },
                maxLength: {
                  value: 15,
                  message: InputErrors.MAX_LENGTH,
                },
              })}
            />
            <div className="modal-card__message">
              {errors?.last_name &&
                `${errors?.last_name?.message || InputErrors.ERROR}`}
            </div>
          </div>

          <div>
            <label className="modal-card__label">Email</label>

            <input
              className="modal-card__input"
              placeholder="Email"
              {...register('email', {
                required: InputErrors.REQUIRED,
                minLength: {
                  value: 4,
                  message: InputErrors.MIN_LENGTH,
                },
                pattern: {
                  value: emailPattern,
                  message: InputErrors.PATTERN,
                },
                maxLength: {
                  value: 30,
                  message: InputErrors.MAX_LENGTH,
                },
              })}
            />
            <div className="modal-card__message">
              {errors?.email &&
                `${errors?.email?.message || InputErrors.ERROR}`}
            </div>
          </div>

          <div>
            <label className="modal-card__label">Adress</label>

            <input
              className="modal-card__input"
              placeholder="Addres"
              {...register('address', {
                required: InputErrors.REQUIRED,
                minLength: {
                  value: 4,
                  message: InputErrors.MIN_LENGTH,
                },
                pattern: {
                  value: addressPattern,
                  message: InputErrors.PATTERN,
                },
                maxLength: {
                  value: 30,
                  message: InputErrors.MAX_LENGTH,
                },
              })}
            />
            <div className="modal-card__message">
              {errors?.address &&
                `${errors?.address?.message || InputErrors.ERROR}`}
            </div>
          </div>

          <div className="modal-card__footer">
            <div>
              <label className="modal-card__label">Gender</label>

              <select
                className="modal-card__select"
                {...register('gender')}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            {isAdding ? (
              <Button content="add person" />
            ) : (
              <Button content="edit person" />
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
