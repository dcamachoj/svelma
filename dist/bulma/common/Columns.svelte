<script>import { classnames } from "../../utils/classnames.js";
export let isGapless = false;
export let isMultiline = false;
export let isCentered = false;
export let isVCentered = false;
export let gap = void 0;
export let gapMobile = void 0;
export let gapTablet = void 0;
export let gapTouch = void 0;
export let gapDesktop = void 0;
export let gapWidescreen = void 0;
export let gapFullHD = void 0;
$:
  cls = classnames("columns", {
    "is-gapless": isGapless,
    "is-multiline": isMultiline,
    "is-centered": isCentered,
    "is-vcentered": isVCentered,
    [`is-${gap}`]: gap != void 0,
    [`is-${gap}-mobile`]: gapMobile != void 0,
    [`is-${gap}-tablet`]: gapTablet != void 0,
    [`is-${gap}-touch`]: gapTouch != void 0,
    [`is-${gap}-desktop`]: gapDesktop != void 0,
    [`is-${gap}-widescreen`]: gapWidescreen != void 0,
    [`is-${gap}-fullhd`]: gapFullHD != void 0
  });
</script>

<div class={cls}>
	<slot />
</div>
