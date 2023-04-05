import { LoadMoreButton } from './Button.styled';
import PropTypes from 'prop-types';

export const Button = ({ onLoadMore }) => {
  return (
    <div>
      <LoadMoreButton type="button" onClick={onLoadMore}>
        Load more
      </LoadMoreButton>
    </div>
  );
};

Button.propTypes = {
  onBtnLoadMore: PropTypes.func,
};
