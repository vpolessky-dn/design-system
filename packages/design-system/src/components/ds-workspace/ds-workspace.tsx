import classNames from 'classnames';
import styles from './ds-workspace.module.scss';
import type {
	DsWorkspaceProps,
	DsWorkspaceHeaderProps,
	DsWorkspaceSubHeaderProps,
	DsWorkspaceContentProps,
	DsWorkspaceFooterProps,
} from './ds-workspace.types';

const DsWorkspace = ({ ref, className, style, fillParent = false, children }: DsWorkspaceProps) => (
	<div
		ref={ref}
		className={classNames(styles.root, { [styles.fillParent]: fillParent }, className)}
		style={style}
	>
		{children}
	</div>
);

const Header = ({ ref, className, style, children }: DsWorkspaceHeaderProps) => (
	<header ref={ref} className={classNames(styles.header, className)} style={style}>
		{children}
	</header>
);

const SubHeader = ({ ref, className, style, children }: DsWorkspaceSubHeaderProps) => (
	<div ref={ref} className={classNames(styles.subHeader, className)} style={style}>
		{children}
	</div>
);

/** Stacking context for non-portal drawer containment. */
const Content = ({ ref, className, style, children }: DsWorkspaceContentProps) => (
	<div ref={ref} className={classNames(styles.content, className)} style={style}>
		{children}
	</div>
);

const Footer = ({ ref, className, style, children }: DsWorkspaceFooterProps) => (
	<footer ref={ref} className={classNames(styles.footer, className)} style={style}>
		{children}
	</footer>
);

DsWorkspace.Header = Header;
DsWorkspace.SubHeader = SubHeader;
DsWorkspace.Content = Content;
DsWorkspace.Footer = Footer;

export default DsWorkspace;
