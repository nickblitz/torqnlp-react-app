import PropTypes from 'prop-types';
import { matchPath } from 'react-router-dom';
import { List } from '@material-ui/core';
import NavItem from './NavItem';

const renderNavItems = ({ depth = 0, items, pathname }) => (
  <List disablePadding>
    {items.reduce(
      // eslint-disable-next-line no-use-before-define
      (acc, item) => reduceChildRoutes({
        acc,
        item,
        pathname,
        depth
      }), []
    )}
  </List>
);

const reduceChildRoutes = ({ acc, pathname, item, depth }) => {
  const key = `${item.title}-${depth}`;
  const exactMatch = item.path ? !!matchPath({
    path: item.path,
    end: true
  }, pathname) : false;

  if (item.children) {
    const partialMatch = item.path ? !!matchPath({
      path: item.path,
      end: false
    }, pathname) : false;

    acc.push(
      <NavItem
        active={partialMatch}
        depth={depth}
        icon={item.icon}
        info={item.info}
        key={key}
        open={partialMatch}
        path={item.path}
        title={item.title}
      >
        {renderNavItems({
          depth: depth + 1,
          items: item.children,
          pathname
        })}
      </NavItem>
    );
  } else {
    acc.push(
      <NavItem
        active={exactMatch}
        depth={depth}
        icon={item.icon}
        info={item.info}
        key={key}
        path={item.path}
        title={item.title}
      />
    );
  }

  return acc;
};

const NavSection = (props) => {
  const { items, pathname, title, ...other } = props;

  return (
    <List
      {...other}
    >
      {renderNavItems({
        items,
        pathname
      })}
    </List>
  );
};

NavSection.propTypes = {
  items: PropTypes.array,
  pathname: PropTypes.string,
  title: PropTypes.string
};

export default NavSection;
