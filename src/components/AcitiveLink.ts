import { withRouter } from "next/router";
import Link from "next/link";
import React, { Children } from "react";

const ActiveLink = ({ router, children, ...props }): JSX.Element => {
	const child = Children.only(children);

	let className = child.props.className || null;
	if (router.pathname === props.href && props.activeClassName) {
		className = `${className !== null ? className : ""} ${
			props.activeClassName
		}`.trim();
	}

	delete props.activeClassName;

	return React.cloneElement(child, { className, component: Link });
};

export default withRouter(ActiveLink);
