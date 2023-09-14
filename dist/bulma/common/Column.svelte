<script>import { classnames } from "../../utils/classnames.js";
export let size = void 0;
export let sizeMobile = void 0;
export let sizeTablet = void 0;
export let sizeTouch = void 0;
export let sizeDesktop = void 0;
export let sizeWidescreen = void 0;
export let sizeFulHD = void 0;
export let offset = void 0;
export let offsetMobile = void 0;
export let offsetTablet = void 0;
export let offsetTouch = void 0;
export let offsetDesktop = void 0;
export let offsetWidescreen = void 0;
export let offsetFullHD = void 0;
export let isNarrow = false;
export let isNarrowMobile = false;
export let isNarrowTablet = false;
export let isNarrowTouch = false;
export let isNarrowDesktop = false;
export let isNarrowWidescreen = false;
export let isNarrowFullHD = false;
$:
  cls = classnames("column", {
    [`is-${size}`]: size != void 0,
    [`is-${sizeMobile}-mobile`]: sizeMobile != void 0,
    [`is-${sizeTablet}-tablet`]: sizeTablet != void 0,
    [`is-${sizeTouch}-touch`]: sizeTouch != void 0,
    [`is-${sizeDesktop}-desktop`]: sizeDesktop != void 0,
    [`is-${sizeWidescreen}-widescreen`]: sizeWidescreen != void 0,
    [`is-${sizeFulHD}-fullhd`]: sizeFulHD != void 0,
    [`is-offset-${offset}`]: offset != void 0,
    [`is-offset-${offsetMobile}-mobile`]: offsetMobile != void 0,
    [`is-offset-${offsetTablet}-tablet`]: offsetTablet != void 0,
    [`is-offset-${offsetTouch}-touch`]: offsetTouch != void 0,
    [`is-offset-${offsetDesktop}-desktop`]: offsetDesktop != void 0,
    [`is-offset-${offsetWidescreen}-widescreen`]: offsetWidescreen != void 0,
    [`is-offset-${offsetFullHD}-fullhd`]: offsetFullHD != void 0,
    "is-narrow": isNarrow,
    "is-narrow-mobile": isNarrowMobile,
    "is-narrow-tablet": isNarrowTablet,
    "is-narrow-touch": isNarrowTouch,
    "is-narrow-desktop": isNarrowDesktop,
    "is-narrow-widescreen": isNarrowWidescreen,
    "is-narrow-fullhd": isNarrowFullHD
  });
</script>

<div class={cls}>
	<slot />
</div>
