import React from "react";

interface DrawerProps {
	config: any;
	lang: string;
}

interface DrawerState {
	copyrightFixed: boolean;
	drawerWidth: number;
	drawerLeft: number;
	copyrightTop: number;
}

/**
 * PC端右侧部公共菜单
 */

export default class extends React.Component<DrawerProps, DrawerState> {
	drawer: any;
	copyright: any;
	constructor(props: Readonly<DrawerProps>) {
		super(props);
		this.state = {
			copyrightFixed: false,
			drawerWidth: 296,
			drawerLeft: 0,
			copyrightTop: 0,
		};
	}
	componentDidMount() {
		// window.innerWidth >= 640 && window.addEventListener('scroll', () => {
		//     const t = document.documentElement.scrollTop || document.body.scrollTop;
		//     console.log(t)
		//     if (t > 500) {
		//         this.setState({ copyrightFixed: true })
		//     } else {
		//         this.setState({ copyrightFixed: false })
		//     }
		// })
		//将初始状态保存以便固定
		var toTop =
			document.documentElement.scrollTop || document.body.scrollTop;
		this.setState({
			drawerLeft: this.drawer.getBoundingClientRect().left,
			drawerWidth: this.drawer.getBoundingClientRect().width,
			copyrightTop: this.copyright.getBoundingClientRect().top + toTop,
		});
	}
	render() {
		const { lang } = this.props;
		const {
			copyrightFixed,
			drawerWidth,
			drawerLeft,
			copyrightTop,
		} = this.state;
		const drawerStyle = copyrightFixed
			? {
					left: drawerLeft,
					width: drawerWidth + "px",
			  }
			: {};
		return <div></div>;
	}
}
