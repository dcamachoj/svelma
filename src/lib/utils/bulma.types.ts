export type Colors = 'primary' | 'link' | 'info' | 'success' | 'warning' | 'danger';
export type BwColors = 'white' | 'black' | 'light' | 'dark';
export type GreyColors =
	| 'black-bis'
	| 'black-ter'
	| 'grey-dark'
	| 'grey'
	| 'grey-light'
	| 'grey-lighter'
	| 'white-ter'
	| 'white-bis';
export type LightColors =
	| 'primary-light'
	| 'link-light'
	| 'info-light'
	| 'success-light'
	| 'warning-light'
	| 'danger-light';
export type DarkColors =
	| 'primary-dark'
	| 'link-dark'
	| 'info-dark'
	| 'success-dark'
	| 'warning-dark'
	| 'danger-dark';
export type TextColors = Colors | BwColors | GreyColors | LightColors | DarkColors;
export type BackColors = Colors | BwColors | GreyColors | LightColors | DarkColors;
export type Sizes05 = 0 | 1 | 2 | 3 | 4 | 5 | '0' | '1' | '2' | '3' | '4' | '5';
export type Sizes06 = 0 | 1 | 2 | 3 | 4 | 5 | 6 | '0' | '1' | '2' | '3' | '4' | '5' | '6';
export type Sizes17 = 1 | 2 | 3 | 4 | 5 | 6 | 7 | '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7';
export type TextAlign = 'centered' | 'justified' | 'left' | 'right';
export type TextTransform = 'capitalized' | 'lowercase' | 'uppercase' | 'italic' | 'underlined';
export type TextWeight = 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
export type TextFamily = 'sans-serif' | 'monospace' | 'primary' | 'secondary' | 'code';
export type Display = 'block' | 'flex' | 'inline' | 'inline-block' | 'inline-flex';
export type FlexDir = 'column' | 'column-reverse' | 'row' | 'row-reverse';
export type FlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse';
export type JustifyContent =
	| 'flex-start'
	| 'flex-end'
	| 'center'
	| 'space-between'
	| 'space-around'
	| 'space-evenly'
	| 'start'
	| 'end'
	| 'left'
	| 'right';
export type AlignContent =
	| 'flex-start'
	| 'flex-end'
	| 'center'
	| 'space-between'
	| 'space-around'
	| 'space-evenly'
	| 'stretch'
	| 'start'
	| 'end'
	| 'baseline';
export type AlignItems =
	| 'flex-start'
	| 'flex-end'
	| 'center'
	| 'self-start'
	| 'self-end'
	| 'start'
	| 'end'
	| 'baseline'
	| 'stretch';
export type AlignSelf = 'flex-start' | 'flex-end' | 'auto' | 'center' | 'baseline' | 'stretch';
export type ButtonColor =
	| 'white'
	| 'light'
	| 'dark'
	| 'black'
	| 'text'
	| 'ghost'
	| 'primary'
	| 'link'
	| 'info'
	| 'success'
	| 'warning'
	| 'danger';
export type ButtonSize = 'small' | 'normal' | 'medium' | 'large';

export interface BulmaOptions {
	textColor?: Colors | BwColors | GreyColors | LightColors | DarkColors;
	backColor?: Colors | BwColors | GreyColors | LightColors | DarkColors;
	m?: Sizes06;
	mx?: Sizes06;
	my?: Sizes06;
	mt?: Sizes06;
	mb?: Sizes06;
	ml?: Sizes06;
	mr?: Sizes06;
	p?: Sizes06;
	px?: Sizes06;
	py?: Sizes06;
	pt?: Sizes06;
	pb?: Sizes06;
	pl?: Sizes06;
	pr?: Sizes06;
	textSize?: Sizes17;
	textSizeMobile?: Sizes17;
	textSizeTouch?: Sizes17;
	textSizeTablet?: Sizes17;
	textSizeDesktop?: Sizes17;
	textSizeWidescreen?: Sizes17;
	textSizeFullhd?: Sizes17;
	textAlign?: TextAlign;
	textAlignMobile?: TextAlign;
	textAlignTouch?: TextAlign;
	textAlignTabletOnly?: TextAlign;
	textAlignTablet?: TextAlign;
	textAlignDesktopOnly?: TextAlign;
	textAlignDesktop?: TextAlign;
	textAlignWidescreenOnly?: TextAlign;
	textAlignWidescreen?: TextAlign;
	textAlignFullhd?: TextAlign;
	textTransform?: TextTransform;
	textWeight?: TextWeight;
	fontFamily?: TextFamily;
	display?: Display;
	displayMobile?: Display;
	displayTabletOnly?: Display;
	displayDesktopOnly?: Display;
	displayWidescreenOnly?: Display;
	displayTouch?: Display;
	displayTablet?: Display;
	displayDesktop?: Display;
	displayWidescreen?: Display;
	displayFullhd?: Display;
	hidden?: boolean;
	hiddenMobile?: boolean;
	hiddenTabletOnly?: boolean;
	hiddenDesktopOnly?: boolean;
	hiddenWidescreenOnly?: boolean;
	hiddenTouch?: boolean;
	hiddenTablet?: boolean;
	hiddenDesktop?: boolean;
	hiddenWidescreen?: boolean;
	hiddenFullhd?: boolean;
	invisible?: boolean;
	srOnly?: boolean;
	flexDir?: FlexDir;
	flexWrap?: FlexWrap;
	justifyContent?: JustifyContent;
	alignContent?: AlignContent;
	alignItems?: AlignItems;
	alignSelf?: AlignSelf;
	flex?: Sizes05;
	flexGrow?: Sizes05;
	flexShrink?: Sizes05;
	clearfix?: boolean;
	pulledRight?: boolean;
	pulledLeft?: boolean;
	overlay?: boolean;
	clipped?: boolean;
	radiusless?: boolean;
	shadowless?: boolean;
	unselectable?: boolean;
	clickable?: boolean;
	relative?: boolean;
}

export interface IconTextData {
	icon: string;
	text: string;
}

export interface Action {
	name: string;
	text?: string;
	icon?: string;
}

export type Click = (e?: any) => void;

export interface ItemSelection {
	name: string;
	text: string;
	selected: boolean;
}
export interface FileItem {
	filename: string;
	dataUrl?: string;
	type: string;
	size: number;
}
export type ModalCheck<T> = (v: T) => boolean;

export type ColumnSizeFractions =
	| 'three-quarters'
	| 'two-thirds'
	| 'half'
	| 'one-third'
	| 'one-quarter'
	| 'id-full';
export type ColumnSizeFifths = 'four-fifths' | 'three-fifths' | 'two-fifths' | 'one-fifths';
export type ColumnSize12N = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type ColumnSize12S =
	| '1'
	| '2'
	| '3'
	| '4'
	| '5'
	| '6'
	| '7'
	| '8'
	| '9'
	| '10'
	| '11'
	| '12';
export type ColumnSize = ColumnSizeFractions | ColumnSizeFifths | ColumnSize12N | ColumnSize12S;
export type ColumnGapN = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type ColumnGapS = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8';
export type ColumnGap = ColumnGapN | ColumnGapS;
export type OlType = 'lower-alpha' | 'lower-roman' | 'upper-alpha' | 'upper-roman';
export type ContentSize = 'small' | 'medium' | 'large';
export type ImageSize = '16x16' | '24x24' | '32x32' | '48x48' | '64x64' | '96x96' | '128x128';
export type ImageRatio =
	| 'square'
	| '1by1'
	| '3by4'
	| '5by4'
	| '4by3'
	| '3by2'
	| '5by3'
	| '16by9'
	| '2by1'
	| '3by1'
	| '4by5'
	| '3by4'
	| '2by3'
	| '3by5'
	| '9by16'
	| '1by2'
	| '1by3';
export type TagSize = 'normal' | 'medium' | 'large';
export type TitleSizeN = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export type TitleSizeS = '0' | '1' | '2' | '3' | '4' | '5' | '6';
export type TitleSize = TitleSizeN | TitleSizeS;
export interface Action {
	name: string;
	text?: string;
	icon?: string;
	href?: string;
	isActive?: boolean;
	click?: () => void;
}
export type BreadcrumbSeparator = 'arrow' | 'bullet' | 'dot' | 'succeeds';
export interface MenuLabelItem {
	name: string;
	text: string;
	icon?: string;
	children?: MenuItem[];
}
export interface MenuItem {
	action: Action;
	children?: Action[];
}
export type PaginationPage = number | 'prev' | 'next';
export type PaginationAlign = 'left' | 'centered' | 'right';
export type TabsAlign = 'left' | 'centered' | 'right';
export type TabsSize = 'small' | 'medium' | 'large';
export interface Option {
	value: string;
	text: string;
	icon?: string;
}
export type LabelSize = 'small' | 'normal' | 'medium' | 'large';
export type InputSize = 'small' | 'normal' | 'medium' | 'large';
export type FieldAlign = 'left' | 'centered' | 'right';
export type MediaAlign = 'left' | 'right';
export type HeroSize = 'small' | 'medium' | 'large' | 'halfheight' | 'fullheight';
export type SectionSize = 'medium' | 'large';
export type TileType = 'ancestor' | 'parent' | 'child';
export type TileSize = ColumnSize12N | ColumnSize12S;
export type TileLayout = 'horizontal' | 'vertical';
