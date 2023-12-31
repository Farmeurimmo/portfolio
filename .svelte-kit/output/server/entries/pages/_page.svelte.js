import {
    a as subscribe,
    b as compute_rest_props,
    c as create_ssr_component,
    d as spread,
    e as escape,
    f as escape_object,
    g as getContext,
    h as escape_attribute_value,
    i as add_attribute,
    j as get_current_component,
    k as compute_slots,
    l as each,
    s as setContext,
    v as validate_component
} from "../../chunks/ssr.js";
import {$ as $locale, a as $format, f as fallbackLocale, l as languageOptions} from "../../chunks/i18n.js";
import {w as writable} from "../../chunks/index.js";

const void_element_names = /^(?:area|base|br|col|command|embed|hr|img|input|keygen|link|meta|param|source|track|wbr)$/;

function is_void(name) {
    return void_element_names.test(name) || name.toLowerCase() === "!doctype";
}

const Image_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
    let {src} = $$props;
    let {className} = $$props;
    if ($$props.src === void 0 && $$bindings.src && src !== void 0)
        $$bindings.src(src);
    if ($$props.className === void 0 && $$bindings.className && className !== void 0)
        $$bindings.className(className);
    return `${`${`${``}`}`}`;
});
const CommonFooter = create_ssr_component(($$result, $$props, $$bindings, slots) => {
    return `<footer data-svelte-h="svelte-n686wx"><div class="flex justify-between items-center"><p id="a">Commit</p></div></footer>`;
});
const CLASS_PART_SEPARATOR = "-";

function createClassUtils(config) {
    const classMap = createClassMap(config);
    const {
        conflictingClassGroups,
        conflictingClassGroupModifiers
    } = config;

    function getClassGroupId(className) {
        const classParts = className.split(CLASS_PART_SEPARATOR);
        if (classParts[0] === "" && classParts.length !== 1) {
            classParts.shift();
        }
        return getGroupRecursive(classParts, classMap) || getGroupIdForArbitraryProperty(className);
    }

    function getConflictingClassGroupIds(classGroupId, hasPostfixModifier) {
        const conflicts = conflictingClassGroups[classGroupId] || [];
        if (hasPostfixModifier && conflictingClassGroupModifiers[classGroupId]) {
            return [...conflicts, ...conflictingClassGroupModifiers[classGroupId]];
        }
        return conflicts;
    }

    return {
        getClassGroupId,
        getConflictingClassGroupIds
    };
}

function getGroupRecursive(classParts, classPartObject) {
    if (classParts.length === 0) {
        return classPartObject.classGroupId;
    }
    const currentClassPart = classParts[0];
    const nextClassPartObject = classPartObject.nextPart.get(currentClassPart);
    const classGroupFromNextClassPart = nextClassPartObject ? getGroupRecursive(classParts.slice(1), nextClassPartObject) : void 0;
    if (classGroupFromNextClassPart) {
        return classGroupFromNextClassPart;
    }
    if (classPartObject.validators.length === 0) {
        return void 0;
    }
    const classRest = classParts.join(CLASS_PART_SEPARATOR);
    return classPartObject.validators.find(({
                                                validator
                                            }) => validator(classRest))?.classGroupId;
}

const arbitraryPropertyRegex = /^\[(.+)\]$/;

function getGroupIdForArbitraryProperty(className) {
    if (arbitraryPropertyRegex.test(className)) {
        const arbitraryPropertyClassName = arbitraryPropertyRegex.exec(className)[1];
        const property = arbitraryPropertyClassName?.substring(0, arbitraryPropertyClassName.indexOf(":"));
        if (property) {
            return "arbitrary.." + property;
        }
    }
}

function createClassMap(config) {
    const {
        theme,
        prefix
    } = config;
    const classMap = {
        nextPart: /* @__PURE__ */ new Map(),
        validators: []
    };
    const prefixedClassGroupEntries = getPrefixedClassGroupEntries(Object.entries(config.classGroups), prefix);
    prefixedClassGroupEntries.forEach(([classGroupId, classGroup]) => {
        processClassesRecursively(classGroup, classMap, classGroupId, theme);
    });
    return classMap;
}

function processClassesRecursively(classGroup, classPartObject, classGroupId, theme) {
    classGroup.forEach((classDefinition) => {
        if (typeof classDefinition === "string") {
            const classPartObjectToEdit = classDefinition === "" ? classPartObject : getPart(classPartObject, classDefinition);
            classPartObjectToEdit.classGroupId = classGroupId;
            return;
        }
        if (typeof classDefinition === "function") {
            if (isThemeGetter(classDefinition)) {
                processClassesRecursively(classDefinition(theme), classPartObject, classGroupId, theme);
                return;
            }
            classPartObject.validators.push({
                validator: classDefinition,
                classGroupId
            });
            return;
        }
        Object.entries(classDefinition).forEach(([key, classGroup2]) => {
            processClassesRecursively(classGroup2, getPart(classPartObject, key), classGroupId, theme);
        });
    });
}

function getPart(classPartObject, path) {
    let currentClassPartObject = classPartObject;
    path.split(CLASS_PART_SEPARATOR).forEach((pathPart) => {
        if (!currentClassPartObject.nextPart.has(pathPart)) {
            currentClassPartObject.nextPart.set(pathPart, {
                nextPart: /* @__PURE__ */ new Map(),
                validators: []
            });
        }
        currentClassPartObject = currentClassPartObject.nextPart.get(pathPart);
    });
    return currentClassPartObject;
}

function isThemeGetter(func) {
    return func.isThemeGetter;
}

function getPrefixedClassGroupEntries(classGroupEntries, prefix) {
    if (!prefix) {
        return classGroupEntries;
    }
    return classGroupEntries.map(([classGroupId, classGroup]) => {
        const prefixedClassGroup = classGroup.map((classDefinition) => {
            if (typeof classDefinition === "string") {
                return prefix + classDefinition;
            }
            if (typeof classDefinition === "object") {
                return Object.fromEntries(Object.entries(classDefinition).map(([key, value]) => [prefix + key, value]));
            }
            return classDefinition;
        });
        return [classGroupId, prefixedClassGroup];
    });
}

function createLruCache(maxCacheSize) {
    if (maxCacheSize < 1) {
        return {
            get: () => void 0,
            set: () => {
            }
        };
    }
    let cacheSize = 0;
    let cache = /* @__PURE__ */ new Map();
    let previousCache = /* @__PURE__ */ new Map();

    function update(key, value) {
        cache.set(key, value);
        cacheSize++;
        if (cacheSize > maxCacheSize) {
            cacheSize = 0;
            previousCache = cache;
            cache = /* @__PURE__ */ new Map();
        }
    }

    return {
        get(key) {
            let value = cache.get(key);
            if (value !== void 0) {
                return value;
            }
            if ((value = previousCache.get(key)) !== void 0) {
                update(key, value);
                return value;
            }
        },
        set(key, value) {
            if (cache.has(key)) {
                cache.set(key, value);
            } else {
                update(key, value);
            }
        }
    };
}

const IMPORTANT_MODIFIER = "!";

function createSplitModifiers(config) {
    const separator = config.separator;
    const isSeparatorSingleCharacter = separator.length === 1;
    const firstSeparatorCharacter = separator[0];
    const separatorLength = separator.length;
    return function splitModifiers(className) {
        const modifiers = [];
        let bracketDepth = 0;
        let modifierStart = 0;
        let postfixModifierPosition;
        for (let index = 0; index < className.length; index++) {
            let currentCharacter = className[index];
            if (bracketDepth === 0) {
                if (currentCharacter === firstSeparatorCharacter && (isSeparatorSingleCharacter || className.slice(index, index + separatorLength) === separator)) {
                    modifiers.push(className.slice(modifierStart, index));
                    modifierStart = index + separatorLength;
                    continue;
                }
                if (currentCharacter === "/") {
                    postfixModifierPosition = index;
                    continue;
                }
            }
            if (currentCharacter === "[") {
                bracketDepth++;
            } else if (currentCharacter === "]") {
                bracketDepth--;
            }
        }
        const baseClassNameWithImportantModifier = modifiers.length === 0 ? className : className.substring(modifierStart);
        const hasImportantModifier = baseClassNameWithImportantModifier.startsWith(IMPORTANT_MODIFIER);
        const baseClassName = hasImportantModifier ? baseClassNameWithImportantModifier.substring(1) : baseClassNameWithImportantModifier;
        const maybePostfixModifierPosition = postfixModifierPosition && postfixModifierPosition > modifierStart ? postfixModifierPosition - modifierStart : void 0;
        return {
            modifiers,
            hasImportantModifier,
            baseClassName,
            maybePostfixModifierPosition
        };
    };
}

function sortModifiers(modifiers) {
    if (modifiers.length <= 1) {
        return modifiers;
    }
    const sortedModifiers = [];
    let unsortedModifiers = [];
    modifiers.forEach((modifier) => {
        const isArbitraryVariant = modifier[0] === "[";
        if (isArbitraryVariant) {
            sortedModifiers.push(...unsortedModifiers.sort(), modifier);
            unsortedModifiers = [];
        } else {
            unsortedModifiers.push(modifier);
        }
    });
    sortedModifiers.push(...unsortedModifiers.sort());
    return sortedModifiers;
}

function createConfigUtils(config) {
    return {
        cache: createLruCache(config.cacheSize),
        splitModifiers: createSplitModifiers(config),
        ...createClassUtils(config)
    };
}

const SPLIT_CLASSES_REGEX = /\s+/;

function mergeClassList(classList, configUtils) {
    const {
        splitModifiers,
        getClassGroupId,
        getConflictingClassGroupIds
    } = configUtils;
    const classGroupsInConflict = /* @__PURE__ */ new Set();
    return classList.trim().split(SPLIT_CLASSES_REGEX).map((originalClassName) => {
        const {
            modifiers,
            hasImportantModifier,
            baseClassName,
            maybePostfixModifierPosition
        } = splitModifiers(originalClassName);
        let classGroupId = getClassGroupId(maybePostfixModifierPosition ? baseClassName.substring(0, maybePostfixModifierPosition) : baseClassName);
        let hasPostfixModifier = Boolean(maybePostfixModifierPosition);
        if (!classGroupId) {
            if (!maybePostfixModifierPosition) {
                return {
                    isTailwindClass: false,
                    originalClassName
                };
            }
            classGroupId = getClassGroupId(baseClassName);
            if (!classGroupId) {
                return {
                    isTailwindClass: false,
                    originalClassName
                };
            }
            hasPostfixModifier = false;
        }
        const variantModifier = sortModifiers(modifiers).join(":");
        const modifierId = hasImportantModifier ? variantModifier + IMPORTANT_MODIFIER : variantModifier;
        return {
            isTailwindClass: true,
            modifierId,
            classGroupId,
            originalClassName,
            hasPostfixModifier
        };
    }).reverse().filter((parsed) => {
        if (!parsed.isTailwindClass) {
            return true;
        }
        const {
            modifierId,
            classGroupId,
            hasPostfixModifier
        } = parsed;
        const classId = modifierId + classGroupId;
        if (classGroupsInConflict.has(classId)) {
            return false;
        }
        classGroupsInConflict.add(classId);
        getConflictingClassGroupIds(classGroupId, hasPostfixModifier).forEach((group) => classGroupsInConflict.add(modifierId + group));
        return true;
    }).reverse().map((parsed) => parsed.originalClassName).join(" ");
}

function twJoin() {
    let index = 0;
    let argument;
    let resolvedValue;
    let string = "";
    while (index < arguments.length) {
        if (argument = arguments[index++]) {
            if (resolvedValue = toValue(argument)) {
                string && (string += " ");
                string += resolvedValue;
            }
        }
    }
    return string;
}

function toValue(mix) {
    if (typeof mix === "string") {
        return mix;
    }
    let resolvedValue;
    let string = "";
    for (let k = 0; k < mix.length; k++) {
        if (mix[k]) {
            if (resolvedValue = toValue(mix[k])) {
                string && (string += " ");
                string += resolvedValue;
            }
        }
    }
    return string;
}

function createTailwindMerge(createConfigFirst, ...createConfigRest) {
    let configUtils;
    let cacheGet;
    let cacheSet;
    let functionToCall = initTailwindMerge;

    function initTailwindMerge(classList) {
        const config = createConfigRest.reduce((previousConfig, createConfigCurrent) => createConfigCurrent(previousConfig), createConfigFirst());
        configUtils = createConfigUtils(config);
        cacheGet = configUtils.cache.get;
        cacheSet = configUtils.cache.set;
        functionToCall = tailwindMerge;
        return tailwindMerge(classList);
    }

    function tailwindMerge(classList) {
        const cachedResult = cacheGet(classList);
        if (cachedResult) {
            return cachedResult;
        }
        const result = mergeClassList(classList, configUtils);
        cacheSet(classList, result);
        return result;
    }

    return function callTailwindMerge() {
        return functionToCall(twJoin.apply(null, arguments));
    };
}

function fromTheme(key) {
    const themeGetter = (theme) => theme[key] || [];
    themeGetter.isThemeGetter = true;
    return themeGetter;
}

const arbitraryValueRegex = /^\[(?:([a-z-]+):)?(.+)\]$/i;
const fractionRegex = /^\d+\/\d+$/;
const stringLengths = /* @__PURE__ */ new Set(["px", "full", "screen"]);
const tshirtUnitRegex = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/;
const lengthUnitRegex = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/;
const shadowRegex = /^-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/;
const imageRegex = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/;

function isLength(value) {
    return isNumber(value) || stringLengths.has(value) || fractionRegex.test(value);
}

function isArbitraryLength(value) {
    return getIsArbitraryValue(value, "length", isLengthOnly);
}

function isNumber(value) {
    return Boolean(value) && !Number.isNaN(Number(value));
}

function isArbitraryNumber(value) {
    return getIsArbitraryValue(value, "number", isNumber);
}

function isInteger(value) {
    return Boolean(value) && Number.isInteger(Number(value));
}

function isPercent(value) {
    return value.endsWith("%") && isNumber(value.slice(0, -1));
}

function isArbitraryValue(value) {
    return arbitraryValueRegex.test(value);
}

function isTshirtSize(value) {
    return tshirtUnitRegex.test(value);
}

const sizeLabels = /* @__PURE__ */ new Set(["length", "size", "percentage"]);

function isArbitrarySize(value) {
    return getIsArbitraryValue(value, sizeLabels, isNever);
}

function isArbitraryPosition(value) {
    return getIsArbitraryValue(value, "position", isNever);
}

const imageLabels = /* @__PURE__ */ new Set(["image", "url"]);

function isArbitraryImage(value) {
    return getIsArbitraryValue(value, imageLabels, isImage);
}

function isArbitraryShadow(value) {
    return getIsArbitraryValue(value, "", isShadow);
}

function isAny() {
    return true;
}

function getIsArbitraryValue(value, label, testValue) {
    const result = arbitraryValueRegex.exec(value);
    if (result) {
        if (result[1]) {
            return typeof label === "string" ? result[1] === label : label.has(result[1]);
        }
        return testValue(result[2]);
    }
    return false;
}

function isLengthOnly(value) {
    return lengthUnitRegex.test(value);
}

function isNever() {
    return false;
}

function isShadow(value) {
    return shadowRegex.test(value);
}

function isImage(value) {
    return imageRegex.test(value);
}

function getDefaultConfig() {
    const colors = fromTheme("colors");
    const spacing = fromTheme("spacing");
    const blur = fromTheme("blur");
    const brightness = fromTheme("brightness");
    const borderColor = fromTheme("borderColor");
    const borderRadius = fromTheme("borderRadius");
    const borderSpacing = fromTheme("borderSpacing");
    const borderWidth = fromTheme("borderWidth");
    const contrast = fromTheme("contrast");
    const grayscale = fromTheme("grayscale");
    const hueRotate = fromTheme("hueRotate");
    const invert = fromTheme("invert");
    const gap = fromTheme("gap");
    const gradientColorStops = fromTheme("gradientColorStops");
    const gradientColorStopPositions = fromTheme("gradientColorStopPositions");
    const inset = fromTheme("inset");
    const margin = fromTheme("margin");
    const opacity = fromTheme("opacity");
    const padding = fromTheme("padding");
    const saturate = fromTheme("saturate");
    const scale = fromTheme("scale");
    const sepia = fromTheme("sepia");
    const skew = fromTheme("skew");
    const space = fromTheme("space");
    const translate = fromTheme("translate");
    const getOverscroll = () => ["auto", "contain", "none"];
    const getOverflow = () => ["auto", "hidden", "clip", "visible", "scroll"];
    const getSpacingWithAutoAndArbitrary = () => ["auto", isArbitraryValue, spacing];
    const getSpacingWithArbitrary = () => [isArbitraryValue, spacing];
    const getLengthWithEmptyAndArbitrary = () => ["", isLength, isArbitraryLength];
    const getNumberWithAutoAndArbitrary = () => ["auto", isNumber, isArbitraryValue];
    const getPositions = () => ["bottom", "center", "left", "left-bottom", "left-top", "right", "right-bottom", "right-top", "top"];
    const getLineStyles = () => ["solid", "dashed", "dotted", "double", "none"];
    const getBlendModes = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity", "plus-lighter"];
    const getAlign = () => ["start", "end", "center", "between", "around", "evenly", "stretch"];
    const getZeroAndEmpty = () => ["", "0", isArbitraryValue];
    const getBreaks = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"];
    const getNumber = () => [isNumber, isArbitraryNumber];
    const getNumberAndArbitrary = () => [isNumber, isArbitraryValue];
    return {
        cacheSize: 500,
        separator: ":",
        theme: {
            colors: [isAny],
            spacing: [isLength, isArbitraryLength],
            blur: ["none", "", isTshirtSize, isArbitraryValue],
            brightness: getNumber(),
            borderColor: [colors],
            borderRadius: ["none", "", "full", isTshirtSize, isArbitraryValue],
            borderSpacing: getSpacingWithArbitrary(),
            borderWidth: getLengthWithEmptyAndArbitrary(),
            contrast: getNumber(),
            grayscale: getZeroAndEmpty(),
            hueRotate: getNumberAndArbitrary(),
            invert: getZeroAndEmpty(),
            gap: getSpacingWithArbitrary(),
            gradientColorStops: [colors],
            gradientColorStopPositions: [isPercent, isArbitraryLength],
            inset: getSpacingWithAutoAndArbitrary(),
            margin: getSpacingWithAutoAndArbitrary(),
            opacity: getNumber(),
            padding: getSpacingWithArbitrary(),
            saturate: getNumber(),
            scale: getNumber(),
            sepia: getZeroAndEmpty(),
            skew: getNumberAndArbitrary(),
            space: getSpacingWithArbitrary(),
            translate: getSpacingWithArbitrary()
        },
        classGroups: {
            // Layout
            /**
             * Aspect Ratio
             * @see https://tailwindcss.com/docs/aspect-ratio
             */
            aspect: [{
                aspect: ["auto", "square", "video", isArbitraryValue]
            }],
            /**
             * Container
             * @see https://tailwindcss.com/docs/container
             */
            container: ["container"],
            /**
             * Columns
             * @see https://tailwindcss.com/docs/columns
             */
            columns: [{
                columns: [isTshirtSize]
            }],
            /**
             * Break After
             * @see https://tailwindcss.com/docs/break-after
             */
            "break-after": [{
                "break-after": getBreaks()
            }],
            /**
             * Break Before
             * @see https://tailwindcss.com/docs/break-before
             */
            "break-before": [{
                "break-before": getBreaks()
            }],
            /**
             * Break Inside
             * @see https://tailwindcss.com/docs/break-inside
             */
            "break-inside": [{
                "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
            }],
            /**
             * Box Decoration Break
             * @see https://tailwindcss.com/docs/box-decoration-break
             */
            "box-decoration": [{
                "box-decoration": ["slice", "clone"]
            }],
            /**
             * Box Sizing
             * @see https://tailwindcss.com/docs/box-sizing
             */
            box: [{
                box: ["border", "content"]
            }],
            /**
             * Display
             * @see https://tailwindcss.com/docs/display
             */
            display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
            /**
             * Floats
             * @see https://tailwindcss.com/docs/float
             */
            float: [{
                float: ["right", "left", "none"]
            }],
            /**
             * Clear
             * @see https://tailwindcss.com/docs/clear
             */
            clear: [{
                clear: ["left", "right", "both", "none"]
            }],
            /**
             * Isolation
             * @see https://tailwindcss.com/docs/isolation
             */
            isolation: ["isolate", "isolation-auto"],
            /**
             * Object Fit
             * @see https://tailwindcss.com/docs/object-fit
             */
            "object-fit": [{
                object: ["contain", "cover", "fill", "none", "scale-down"]
            }],
            /**
             * Object Position
             * @see https://tailwindcss.com/docs/object-position
             */
            "object-position": [{
                object: [...getPositions(), isArbitraryValue]
            }],
            /**
             * Overflow
             * @see https://tailwindcss.com/docs/overflow
             */
            overflow: [{
                overflow: getOverflow()
            }],
            /**
             * Overflow X
             * @see https://tailwindcss.com/docs/overflow
             */
            "overflow-x": [{
                "overflow-x": getOverflow()
            }],
            /**
             * Overflow Y
             * @see https://tailwindcss.com/docs/overflow
             */
            "overflow-y": [{
                "overflow-y": getOverflow()
            }],
            /**
             * Overscroll Behavior
             * @see https://tailwindcss.com/docs/overscroll-behavior
             */
            overscroll: [{
                overscroll: getOverscroll()
            }],
            /**
             * Overscroll Behavior X
             * @see https://tailwindcss.com/docs/overscroll-behavior
             */
            "overscroll-x": [{
                "overscroll-x": getOverscroll()
            }],
            /**
             * Overscroll Behavior Y
             * @see https://tailwindcss.com/docs/overscroll-behavior
             */
            "overscroll-y": [{
                "overscroll-y": getOverscroll()
            }],
            /**
             * Position
             * @see https://tailwindcss.com/docs/position
             */
            position: ["static", "fixed", "absolute", "relative", "sticky"],
            /**
             * Top / Right / Bottom / Left
             * @see https://tailwindcss.com/docs/top-right-bottom-left
             */
            inset: [{
                inset: [inset]
            }],
            /**
             * Right / Left
             * @see https://tailwindcss.com/docs/top-right-bottom-left
             */
            "inset-x": [{
                "inset-x": [inset]
            }],
            /**
             * Top / Bottom
             * @see https://tailwindcss.com/docs/top-right-bottom-left
             */
            "inset-y": [{
                "inset-y": [inset]
            }],
            /**
             * Start
             * @see https://tailwindcss.com/docs/top-right-bottom-left
             */
            start: [{
                start: [inset]
            }],
            /**
             * End
             * @see https://tailwindcss.com/docs/top-right-bottom-left
             */
            end: [{
                end: [inset]
            }],
            /**
             * Top
             * @see https://tailwindcss.com/docs/top-right-bottom-left
             */
            top: [{
                top: [inset]
            }],
            /**
             * Right
             * @see https://tailwindcss.com/docs/top-right-bottom-left
             */
            right: [{
                right: [inset]
            }],
            /**
             * Bottom
             * @see https://tailwindcss.com/docs/top-right-bottom-left
             */
            bottom: [{
                bottom: [inset]
            }],
            /**
             * Left
             * @see https://tailwindcss.com/docs/top-right-bottom-left
             */
            left: [{
                left: [inset]
            }],
            /**
             * Visibility
             * @see https://tailwindcss.com/docs/visibility
             */
            visibility: ["visible", "invisible", "collapse"],
            /**
             * Z-Index
             * @see https://tailwindcss.com/docs/z-index
             */
            z: [{
                z: ["auto", isInteger, isArbitraryValue]
            }],
            // Flexbox and Grid
            /**
             * Flex Basis
             * @see https://tailwindcss.com/docs/flex-basis
             */
            basis: [{
                basis: getSpacingWithAutoAndArbitrary()
            }],
            /**
             * Flex Direction
             * @see https://tailwindcss.com/docs/flex-direction
             */
            "flex-direction": [{
                flex: ["row", "row-reverse", "col", "col-reverse"]
            }],
            /**
             * Flex Wrap
             * @see https://tailwindcss.com/docs/flex-wrap
             */
            "flex-wrap": [{
                flex: ["wrap", "wrap-reverse", "nowrap"]
            }],
            /**
             * Flex
             * @see https://tailwindcss.com/docs/flex
             */
            flex: [{
                flex: ["1", "auto", "initial", "none", isArbitraryValue]
            }],
            /**
             * Flex Grow
             * @see https://tailwindcss.com/docs/flex-grow
             */
            grow: [{
                grow: getZeroAndEmpty()
            }],
            /**
             * Flex Shrink
             * @see https://tailwindcss.com/docs/flex-shrink
             */
            shrink: [{
                shrink: getZeroAndEmpty()
            }],
            /**
             * Order
             * @see https://tailwindcss.com/docs/order
             */
            order: [{
                order: ["first", "last", "none", isInteger, isArbitraryValue]
            }],
            /**
             * Grid Template Columns
             * @see https://tailwindcss.com/docs/grid-template-columns
             */
            "grid-cols": [{
                "grid-cols": [isAny]
            }],
            /**
             * Grid Column Start / End
             * @see https://tailwindcss.com/docs/grid-column
             */
            "col-start-end": [{
                col: ["auto", {
                    span: ["full", isInteger, isArbitraryValue]
                }, isArbitraryValue]
            }],
            /**
             * Grid Column Start
             * @see https://tailwindcss.com/docs/grid-column
             */
            "col-start": [{
                "col-start": getNumberWithAutoAndArbitrary()
            }],
            /**
             * Grid Column End
             * @see https://tailwindcss.com/docs/grid-column
             */
            "col-end": [{
                "col-end": getNumberWithAutoAndArbitrary()
            }],
            /**
             * Grid Template Rows
             * @see https://tailwindcss.com/docs/grid-template-rows
             */
            "grid-rows": [{
                "grid-rows": [isAny]
            }],
            /**
             * Grid Row Start / End
             * @see https://tailwindcss.com/docs/grid-row
             */
            "row-start-end": [{
                row: ["auto", {
                    span: [isInteger, isArbitraryValue]
                }, isArbitraryValue]
            }],
            /**
             * Grid Row Start
             * @see https://tailwindcss.com/docs/grid-row
             */
            "row-start": [{
                "row-start": getNumberWithAutoAndArbitrary()
            }],
            /**
             * Grid Row End
             * @see https://tailwindcss.com/docs/grid-row
             */
            "row-end": [{
                "row-end": getNumberWithAutoAndArbitrary()
            }],
            /**
             * Grid Auto Flow
             * @see https://tailwindcss.com/docs/grid-auto-flow
             */
            "grid-flow": [{
                "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
            }],
            /**
             * Grid Auto Columns
             * @see https://tailwindcss.com/docs/grid-auto-columns
             */
            "auto-cols": [{
                "auto-cols": ["auto", "min", "max", "fr", isArbitraryValue]
            }],
            /**
             * Grid Auto Rows
             * @see https://tailwindcss.com/docs/grid-auto-rows
             */
            "auto-rows": [{
                "auto-rows": ["auto", "min", "max", "fr", isArbitraryValue]
            }],
            /**
             * Gap
             * @see https://tailwindcss.com/docs/gap
             */
            gap: [{
                gap: [gap]
            }],
            /**
             * Gap X
             * @see https://tailwindcss.com/docs/gap
             */
            "gap-x": [{
                "gap-x": [gap]
            }],
            /**
             * Gap Y
             * @see https://tailwindcss.com/docs/gap
             */
            "gap-y": [{
                "gap-y": [gap]
            }],
            /**
             * Justify Content
             * @see https://tailwindcss.com/docs/justify-content
             */
            "justify-content": [{
                justify: ["normal", ...getAlign()]
            }],
            /**
             * Justify Items
             * @see https://tailwindcss.com/docs/justify-items
             */
            "justify-items": [{
                "justify-items": ["start", "end", "center", "stretch"]
            }],
            /**
             * Justify Self
             * @see https://tailwindcss.com/docs/justify-self
             */
            "justify-self": [{
                "justify-self": ["auto", "start", "end", "center", "stretch"]
            }],
            /**
             * Align Content
             * @see https://tailwindcss.com/docs/align-content
             */
            "align-content": [{
                content: ["normal", ...getAlign(), "baseline"]
            }],
            /**
             * Align Items
             * @see https://tailwindcss.com/docs/align-items
             */
            "align-items": [{
                items: ["start", "end", "center", "baseline", "stretch"]
            }],
            /**
             * Align Self
             * @see https://tailwindcss.com/docs/align-self
             */
            "align-self": [{
                self: ["auto", "start", "end", "center", "stretch", "baseline"]
            }],
            /**
             * Place Content
             * @see https://tailwindcss.com/docs/place-content
             */
            "place-content": [{
                "place-content": [...getAlign(), "baseline"]
            }],
            /**
             * Place Items
             * @see https://tailwindcss.com/docs/place-items
             */
            "place-items": [{
                "place-items": ["start", "end", "center", "baseline", "stretch"]
            }],
            /**
             * Place Self
             * @see https://tailwindcss.com/docs/place-self
             */
            "place-self": [{
                "place-self": ["auto", "start", "end", "center", "stretch"]
            }],
            // Spacing
            /**
             * Padding
             * @see https://tailwindcss.com/docs/padding
             */
            p: [{
                p: [padding]
            }],
            /**
             * Padding X
             * @see https://tailwindcss.com/docs/padding
             */
            px: [{
                px: [padding]
            }],
            /**
             * Padding Y
             * @see https://tailwindcss.com/docs/padding
             */
            py: [{
                py: [padding]
            }],
            /**
             * Padding Start
             * @see https://tailwindcss.com/docs/padding
             */
            ps: [{
                ps: [padding]
            }],
            /**
             * Padding End
             * @see https://tailwindcss.com/docs/padding
             */
            pe: [{
                pe: [padding]
            }],
            /**
             * Padding Top
             * @see https://tailwindcss.com/docs/padding
             */
            pt: [{
                pt: [padding]
            }],
            /**
             * Padding Right
             * @see https://tailwindcss.com/docs/padding
             */
            pr: [{
                pr: [padding]
            }],
            /**
             * Padding Bottom
             * @see https://tailwindcss.com/docs/padding
             */
            pb: [{
                pb: [padding]
            }],
            /**
             * Padding Left
             * @see https://tailwindcss.com/docs/padding
             */
            pl: [{
                pl: [padding]
            }],
            /**
             * Margin
             * @see https://tailwindcss.com/docs/margin
             */
            m: [{
                m: [margin]
            }],
            /**
             * Margin X
             * @see https://tailwindcss.com/docs/margin
             */
            mx: [{
                mx: [margin]
            }],
            /**
             * Margin Y
             * @see https://tailwindcss.com/docs/margin
             */
            my: [{
                my: [margin]
            }],
            /**
             * Margin Start
             * @see https://tailwindcss.com/docs/margin
             */
            ms: [{
                ms: [margin]
            }],
            /**
             * Margin End
             * @see https://tailwindcss.com/docs/margin
             */
            me: [{
                me: [margin]
            }],
            /**
             * Margin Top
             * @see https://tailwindcss.com/docs/margin
             */
            mt: [{
                mt: [margin]
            }],
            /**
             * Margin Right
             * @see https://tailwindcss.com/docs/margin
             */
            mr: [{
                mr: [margin]
            }],
            /**
             * Margin Bottom
             * @see https://tailwindcss.com/docs/margin
             */
            mb: [{
                mb: [margin]
            }],
            /**
             * Margin Left
             * @see https://tailwindcss.com/docs/margin
             */
            ml: [{
                ml: [margin]
            }],
            /**
             * Space Between X
             * @see https://tailwindcss.com/docs/space
             */
            "space-x": [{
                "space-x": [space]
            }],
            /**
             * Space Between X Reverse
             * @see https://tailwindcss.com/docs/space
             */
            "space-x-reverse": ["space-x-reverse"],
            /**
             * Space Between Y
             * @see https://tailwindcss.com/docs/space
             */
            "space-y": [{
                "space-y": [space]
            }],
            /**
             * Space Between Y Reverse
             * @see https://tailwindcss.com/docs/space
             */
            "space-y-reverse": ["space-y-reverse"],
            // Sizing
            /**
             * Width
             * @see https://tailwindcss.com/docs/width
             */
            w: [{
                w: ["auto", "min", "max", "fit", isArbitraryValue, spacing]
            }],
            /**
             * Min-Width
             * @see https://tailwindcss.com/docs/min-width
             */
            "min-w": [{
                "min-w": ["min", "max", "fit", isArbitraryValue, isLength]
            }],
            /**
             * Max-Width
             * @see https://tailwindcss.com/docs/max-width
             */
            "max-w": [{
                "max-w": ["0", "none", "full", "min", "max", "fit", "prose", {
                    screen: [isTshirtSize]
                }, isTshirtSize, isArbitraryValue]
            }],
            /**
             * Height
             * @see https://tailwindcss.com/docs/height
             */
            h: [{
                h: [isArbitraryValue, spacing, "auto", "min", "max", "fit"]
            }],
            /**
             * Min-Height
             * @see https://tailwindcss.com/docs/min-height
             */
            "min-h": [{
                "min-h": ["min", "max", "fit", isLength, isArbitraryValue]
            }],
            /**
             * Max-Height
             * @see https://tailwindcss.com/docs/max-height
             */
            "max-h": [{
                "max-h": [isArbitraryValue, spacing, "min", "max", "fit"]
            }],
            // Typography
            /**
             * Font Size
             * @see https://tailwindcss.com/docs/font-size
             */
            "font-size": [{
                text: ["base", isTshirtSize, isArbitraryLength]
            }],
            /**
             * Font Smoothing
             * @see https://tailwindcss.com/docs/font-smoothing
             */
            "font-smoothing": ["antialiased", "subpixel-antialiased"],
            /**
             * Font Style
             * @see https://tailwindcss.com/docs/font-style
             */
            "font-style": ["italic", "not-italic"],
            /**
             * Font Weight
             * @see https://tailwindcss.com/docs/font-weight
             */
            "font-weight": [{
                font: ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black", isArbitraryNumber]
            }],
            /**
             * Font Family
             * @see https://tailwindcss.com/docs/font-family
             */
            "font-family": [{
                font: [isAny]
            }],
            /**
             * Font Variant Numeric
             * @see https://tailwindcss.com/docs/font-variant-numeric
             */
            "fvn-normal": ["normal-nums"],
            /**
             * Font Variant Numeric
             * @see https://tailwindcss.com/docs/font-variant-numeric
             */
            "fvn-ordinal": ["ordinal"],
            /**
             * Font Variant Numeric
             * @see https://tailwindcss.com/docs/font-variant-numeric
             */
            "fvn-slashed-zero": ["slashed-zero"],
            /**
             * Font Variant Numeric
             * @see https://tailwindcss.com/docs/font-variant-numeric
             */
            "fvn-figure": ["lining-nums", "oldstyle-nums"],
            /**
             * Font Variant Numeric
             * @see https://tailwindcss.com/docs/font-variant-numeric
             */
            "fvn-spacing": ["proportional-nums", "tabular-nums"],
            /**
             * Font Variant Numeric
             * @see https://tailwindcss.com/docs/font-variant-numeric
             */
            "fvn-fraction": ["diagonal-fractions", "stacked-fractons"],
            /**
             * Letter Spacing
             * @see https://tailwindcss.com/docs/letter-spacing
             */
            tracking: [{
                tracking: ["tighter", "tight", "normal", "wide", "wider", "widest", isArbitraryValue]
            }],
            /**
             * Line Clamp
             * @see https://tailwindcss.com/docs/line-clamp
             */
            "line-clamp": [{
                "line-clamp": ["none", isNumber, isArbitraryNumber]
            }],
            /**
             * Line Height
             * @see https://tailwindcss.com/docs/line-height
             */
            leading: [{
                leading: ["none", "tight", "snug", "normal", "relaxed", "loose", isLength, isArbitraryValue]
            }],
            /**
             * List Style Image
             * @see https://tailwindcss.com/docs/list-style-image
             */
            "list-image": [{
                "list-image": ["none", isArbitraryValue]
            }],
            /**
             * List Style Type
             * @see https://tailwindcss.com/docs/list-style-type
             */
            "list-style-type": [{
                list: ["none", "disc", "decimal", isArbitraryValue]
            }],
            /**
             * List Style Position
             * @see https://tailwindcss.com/docs/list-style-position
             */
            "list-style-position": [{
                list: ["inside", "outside"]
            }],
            /**
             * Placeholder Color
             * @deprecated since Tailwind CSS v3.0.0
             * @see https://tailwindcss.com/docs/placeholder-color
             */
            "placeholder-color": [{
                placeholder: [colors]
            }],
            /**
             * Placeholder Opacity
             * @see https://tailwindcss.com/docs/placeholder-opacity
             */
            "placeholder-opacity": [{
                "placeholder-opacity": [opacity]
            }],
            /**
             * Text Alignment
             * @see https://tailwindcss.com/docs/text-align
             */
            "text-alignment": [{
                text: ["left", "center", "right", "justify", "start", "end"]
            }],
            /**
             * Text Color
             * @see https://tailwindcss.com/docs/text-color
             */
            "text-color": [{
                text: [colors]
            }],
            /**
             * Text Opacity
             * @see https://tailwindcss.com/docs/text-opacity
             */
            "text-opacity": [{
                "text-opacity": [opacity]
            }],
            /**
             * Text Decoration
             * @see https://tailwindcss.com/docs/text-decoration
             */
            "text-decoration": ["underline", "overline", "line-through", "no-underline"],
            /**
             * Text Decoration Style
             * @see https://tailwindcss.com/docs/text-decoration-style
             */
            "text-decoration-style": [{
                decoration: [...getLineStyles(), "wavy"]
            }],
            /**
             * Text Decoration Thickness
             * @see https://tailwindcss.com/docs/text-decoration-thickness
             */
            "text-decoration-thickness": [{
                decoration: ["auto", "from-font", isLength, isArbitraryLength]
            }],
            /**
             * Text Underline Offset
             * @see https://tailwindcss.com/docs/text-underline-offset
             */
            "underline-offset": [{
                "underline-offset": ["auto", isLength, isArbitraryValue]
            }],
            /**
             * Text Decoration Color
             * @see https://tailwindcss.com/docs/text-decoration-color
             */
            "text-decoration-color": [{
                decoration: [colors]
            }],
            /**
             * Text Transform
             * @see https://tailwindcss.com/docs/text-transform
             */
            "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
            /**
             * Text Overflow
             * @see https://tailwindcss.com/docs/text-overflow
             */
            "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
            /**
             * Text Indent
             * @see https://tailwindcss.com/docs/text-indent
             */
            indent: [{
                indent: getSpacingWithArbitrary()
            }],
            /**
             * Vertical Alignment
             * @see https://tailwindcss.com/docs/vertical-align
             */
            "vertical-align": [{
                align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", isArbitraryValue]
            }],
            /**
             * Whitespace
             * @see https://tailwindcss.com/docs/whitespace
             */
            whitespace: [{
                whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
            }],
            /**
             * Word Break
             * @see https://tailwindcss.com/docs/word-break
             */
            break: [{
                break: ["normal", "words", "all", "keep"]
            }],
            /**
             * Hyphens
             * @see https://tailwindcss.com/docs/hyphens
             */
            hyphens: [{
                hyphens: ["none", "manual", "auto"]
            }],
            /**
             * Content
             * @see https://tailwindcss.com/docs/content
             */
            content: [{
                content: ["none", isArbitraryValue]
            }],
            // Backgrounds
            /**
             * Background Attachment
             * @see https://tailwindcss.com/docs/background-attachment
             */
            "bg-attachment": [{
                bg: ["fixed", "local", "scroll"]
            }],
            /**
             * Background Clip
             * @see https://tailwindcss.com/docs/background-clip
             */
            "bg-clip": [{
                "bg-clip": ["border", "padding", "content", "text"]
            }],
            /**
             * Background Opacity
             * @deprecated since Tailwind CSS v3.0.0
             * @see https://tailwindcss.com/docs/background-opacity
             */
            "bg-opacity": [{
                "bg-opacity": [opacity]
            }],
            /**
             * Background Origin
             * @see https://tailwindcss.com/docs/background-origin
             */
            "bg-origin": [{
                "bg-origin": ["border", "padding", "content"]
            }],
            /**
             * Background Position
             * @see https://tailwindcss.com/docs/background-position
             */
            "bg-position": [{
                bg: [...getPositions(), isArbitraryPosition]
            }],
            /**
             * Background Repeat
             * @see https://tailwindcss.com/docs/background-repeat
             */
            "bg-repeat": [{
                bg: ["no-repeat", {
                    repeat: ["", "x", "y", "round", "space"]
                }]
            }],
            /**
             * Background Size
             * @see https://tailwindcss.com/docs/background-size
             */
            "bg-size": [{
                bg: ["auto", "cover", "contain", isArbitrarySize]
            }],
            /**
             * Background Image
             * @see https://tailwindcss.com/docs/background-image
             */
            "bg-image": [{
                bg: ["none", {
                    "gradient-to": ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
                }, isArbitraryImage]
            }],
            /**
             * Background Color
             * @see https://tailwindcss.com/docs/background-color
             */
            "bg-color": [{
                bg: [colors]
            }],
            /**
             * Gradient Color Stops From Position
             * @see https://tailwindcss.com/docs/gradient-color-stops
             */
            "gradient-from-pos": [{
                from: [gradientColorStopPositions]
            }],
            /**
             * Gradient Color Stops Via Position
             * @see https://tailwindcss.com/docs/gradient-color-stops
             */
            "gradient-via-pos": [{
                via: [gradientColorStopPositions]
            }],
            /**
             * Gradient Color Stops To Position
             * @see https://tailwindcss.com/docs/gradient-color-stops
             */
            "gradient-to-pos": [{
                to: [gradientColorStopPositions]
            }],
            /**
             * Gradient Color Stops From
             * @see https://tailwindcss.com/docs/gradient-color-stops
             */
            "gradient-from": [{
                from: [gradientColorStops]
            }],
            /**
             * Gradient Color Stops Via
             * @see https://tailwindcss.com/docs/gradient-color-stops
             */
            "gradient-via": [{
                via: [gradientColorStops]
            }],
            /**
             * Gradient Color Stops To
             * @see https://tailwindcss.com/docs/gradient-color-stops
             */
            "gradient-to": [{
                to: [gradientColorStops]
            }],
            // Borders
            /**
             * Border Radius
             * @see https://tailwindcss.com/docs/border-radius
             */
            rounded: [{
                rounded: [borderRadius]
            }],
            /**
             * Border Radius Start
             * @see https://tailwindcss.com/docs/border-radius
             */
            "rounded-s": [{
                "rounded-s": [borderRadius]
            }],
            /**
             * Border Radius End
             * @see https://tailwindcss.com/docs/border-radius
             */
            "rounded-e": [{
                "rounded-e": [borderRadius]
            }],
            /**
             * Border Radius Top
             * @see https://tailwindcss.com/docs/border-radius
             */
            "rounded-t": [{
                "rounded-t": [borderRadius]
            }],
            /**
             * Border Radius Right
             * @see https://tailwindcss.com/docs/border-radius
             */
            "rounded-r": [{
                "rounded-r": [borderRadius]
            }],
            /**
             * Border Radius Bottom
             * @see https://tailwindcss.com/docs/border-radius
             */
            "rounded-b": [{
                "rounded-b": [borderRadius]
            }],
            /**
             * Border Radius Left
             * @see https://tailwindcss.com/docs/border-radius
             */
            "rounded-l": [{
                "rounded-l": [borderRadius]
            }],
            /**
             * Border Radius Start Start
             * @see https://tailwindcss.com/docs/border-radius
             */
            "rounded-ss": [{
                "rounded-ss": [borderRadius]
            }],
            /**
             * Border Radius Start End
             * @see https://tailwindcss.com/docs/border-radius
             */
            "rounded-se": [{
                "rounded-se": [borderRadius]
            }],
            /**
             * Border Radius End End
             * @see https://tailwindcss.com/docs/border-radius
             */
            "rounded-ee": [{
                "rounded-ee": [borderRadius]
            }],
            /**
             * Border Radius End Start
             * @see https://tailwindcss.com/docs/border-radius
             */
            "rounded-es": [{
                "rounded-es": [borderRadius]
            }],
            /**
             * Border Radius Top Left
             * @see https://tailwindcss.com/docs/border-radius
             */
            "rounded-tl": [{
                "rounded-tl": [borderRadius]
            }],
            /**
             * Border Radius Top Right
             * @see https://tailwindcss.com/docs/border-radius
             */
            "rounded-tr": [{
                "rounded-tr": [borderRadius]
            }],
            /**
             * Border Radius Bottom Right
             * @see https://tailwindcss.com/docs/border-radius
             */
            "rounded-br": [{
                "rounded-br": [borderRadius]
            }],
            /**
             * Border Radius Bottom Left
             * @see https://tailwindcss.com/docs/border-radius
             */
            "rounded-bl": [{
                "rounded-bl": [borderRadius]
            }],
            /**
             * Border Width
             * @see https://tailwindcss.com/docs/border-width
             */
            "border-w": [{
                border: [borderWidth]
            }],
            /**
             * Border Width X
             * @see https://tailwindcss.com/docs/border-width
             */
            "border-w-x": [{
                "border-x": [borderWidth]
            }],
            /**
             * Border Width Y
             * @see https://tailwindcss.com/docs/border-width
             */
            "border-w-y": [{
                "border-y": [borderWidth]
            }],
            /**
             * Border Width Start
             * @see https://tailwindcss.com/docs/border-width
             */
            "border-w-s": [{
                "border-s": [borderWidth]
            }],
            /**
             * Border Width End
             * @see https://tailwindcss.com/docs/border-width
             */
            "border-w-e": [{
                "border-e": [borderWidth]
            }],
            /**
             * Border Width Top
             * @see https://tailwindcss.com/docs/border-width
             */
            "border-w-t": [{
                "border-t": [borderWidth]
            }],
            /**
             * Border Width Right
             * @see https://tailwindcss.com/docs/border-width
             */
            "border-w-r": [{
                "border-r": [borderWidth]
            }],
            /**
             * Border Width Bottom
             * @see https://tailwindcss.com/docs/border-width
             */
            "border-w-b": [{
                "border-b": [borderWidth]
            }],
            /**
             * Border Width Left
             * @see https://tailwindcss.com/docs/border-width
             */
            "border-w-l": [{
                "border-l": [borderWidth]
            }],
            /**
             * Border Opacity
             * @see https://tailwindcss.com/docs/border-opacity
             */
            "border-opacity": [{
                "border-opacity": [opacity]
            }],
            /**
             * Border Style
             * @see https://tailwindcss.com/docs/border-style
             */
            "border-style": [{
                border: [...getLineStyles(), "hidden"]
            }],
            /**
             * Divide Width X
             * @see https://tailwindcss.com/docs/divide-width
             */
            "divide-x": [{
                "divide-x": [borderWidth]
            }],
            /**
             * Divide Width X Reverse
             * @see https://tailwindcss.com/docs/divide-width
             */
            "divide-x-reverse": ["divide-x-reverse"],
            /**
             * Divide Width Y
             * @see https://tailwindcss.com/docs/divide-width
             */
            "divide-y": [{
                "divide-y": [borderWidth]
            }],
            /**
             * Divide Width Y Reverse
             * @see https://tailwindcss.com/docs/divide-width
             */
            "divide-y-reverse": ["divide-y-reverse"],
            /**
             * Divide Opacity
             * @see https://tailwindcss.com/docs/divide-opacity
             */
            "divide-opacity": [{
                "divide-opacity": [opacity]
            }],
            /**
             * Divide Style
             * @see https://tailwindcss.com/docs/divide-style
             */
            "divide-style": [{
                divide: getLineStyles()
            }],
            /**
             * Border Color
             * @see https://tailwindcss.com/docs/border-color
             */
            "border-color": [{
                border: [borderColor]
            }],
            /**
             * Border Color X
             * @see https://tailwindcss.com/docs/border-color
             */
            "border-color-x": [{
                "border-x": [borderColor]
            }],
            /**
             * Border Color Y
             * @see https://tailwindcss.com/docs/border-color
             */
            "border-color-y": [{
                "border-y": [borderColor]
            }],
            /**
             * Border Color Top
             * @see https://tailwindcss.com/docs/border-color
             */
            "border-color-t": [{
                "border-t": [borderColor]
            }],
            /**
             * Border Color Right
             * @see https://tailwindcss.com/docs/border-color
             */
            "border-color-r": [{
                "border-r": [borderColor]
            }],
            /**
             * Border Color Bottom
             * @see https://tailwindcss.com/docs/border-color
             */
            "border-color-b": [{
                "border-b": [borderColor]
            }],
            /**
             * Border Color Left
             * @see https://tailwindcss.com/docs/border-color
             */
            "border-color-l": [{
                "border-l": [borderColor]
            }],
            /**
             * Divide Color
             * @see https://tailwindcss.com/docs/divide-color
             */
            "divide-color": [{
                divide: [borderColor]
            }],
            /**
             * Outline Style
             * @see https://tailwindcss.com/docs/outline-style
             */
            "outline-style": [{
                outline: ["", ...getLineStyles()]
            }],
            /**
             * Outline Offset
             * @see https://tailwindcss.com/docs/outline-offset
             */
            "outline-offset": [{
                "outline-offset": [isLength, isArbitraryValue]
            }],
            /**
             * Outline Width
             * @see https://tailwindcss.com/docs/outline-width
             */
            "outline-w": [{
                outline: [isLength, isArbitraryLength]
            }],
            /**
             * Outline Color
             * @see https://tailwindcss.com/docs/outline-color
             */
            "outline-color": [{
                outline: [colors]
            }],
            /**
             * Ring Width
             * @see https://tailwindcss.com/docs/ring-width
             */
            "ring-w": [{
                ring: getLengthWithEmptyAndArbitrary()
            }],
            /**
             * Ring Width Inset
             * @see https://tailwindcss.com/docs/ring-width
             */
            "ring-w-inset": ["ring-inset"],
            /**
             * Ring Color
             * @see https://tailwindcss.com/docs/ring-color
             */
            "ring-color": [{
                ring: [colors]
            }],
            /**
             * Ring Opacity
             * @see https://tailwindcss.com/docs/ring-opacity
             */
            "ring-opacity": [{
                "ring-opacity": [opacity]
            }],
            /**
             * Ring Offset Width
             * @see https://tailwindcss.com/docs/ring-offset-width
             */
            "ring-offset-w": [{
                "ring-offset": [isLength, isArbitraryLength]
            }],
            /**
             * Ring Offset Color
             * @see https://tailwindcss.com/docs/ring-offset-color
             */
            "ring-offset-color": [{
                "ring-offset": [colors]
            }],
            // Effects
            /**
             * Box Shadow
             * @see https://tailwindcss.com/docs/box-shadow
             */
            shadow: [{
                shadow: ["", "inner", "none", isTshirtSize, isArbitraryShadow]
            }],
            /**
             * Box Shadow Color
             * @see https://tailwindcss.com/docs/box-shadow-color
             */
            "shadow-color": [{
                shadow: [isAny]
            }],
            /**
             * Opacity
             * @see https://tailwindcss.com/docs/opacity
             */
            opacity: [{
                opacity: [opacity]
            }],
            /**
             * Mix Blend Mode
             * @see https://tailwindcss.com/docs/mix-blend-mode
             */
            "mix-blend": [{
                "mix-blend": getBlendModes()
            }],
            /**
             * Background Blend Mode
             * @see https://tailwindcss.com/docs/background-blend-mode
             */
            "bg-blend": [{
                "bg-blend": getBlendModes()
            }],
            // Filters
            /**
             * Filter
             * @deprecated since Tailwind CSS v3.0.0
             * @see https://tailwindcss.com/docs/filter
             */
            filter: [{
                filter: ["", "none"]
            }],
            /**
             * Blur
             * @see https://tailwindcss.com/docs/blur
             */
            blur: [{
                blur: [blur]
            }],
            /**
             * Brightness
             * @see https://tailwindcss.com/docs/brightness
             */
            brightness: [{
                brightness: [brightness]
            }],
            /**
             * Contrast
             * @see https://tailwindcss.com/docs/contrast
             */
            contrast: [{
                contrast: [contrast]
            }],
            /**
             * Drop Shadow
             * @see https://tailwindcss.com/docs/drop-shadow
             */
            "drop-shadow": [{
                "drop-shadow": ["", "none", isTshirtSize, isArbitraryValue]
            }],
            /**
             * Grayscale
             * @see https://tailwindcss.com/docs/grayscale
             */
            grayscale: [{
                grayscale: [grayscale]
            }],
            /**
             * Hue Rotate
             * @see https://tailwindcss.com/docs/hue-rotate
             */
            "hue-rotate": [{
                "hue-rotate": [hueRotate]
            }],
            /**
             * Invert
             * @see https://tailwindcss.com/docs/invert
             */
            invert: [{
                invert: [invert]
            }],
            /**
             * Saturate
             * @see https://tailwindcss.com/docs/saturate
             */
            saturate: [{
                saturate: [saturate]
            }],
            /**
             * Sepia
             * @see https://tailwindcss.com/docs/sepia
             */
            sepia: [{
                sepia: [sepia]
            }],
            /**
             * Backdrop Filter
             * @deprecated since Tailwind CSS v3.0.0
             * @see https://tailwindcss.com/docs/backdrop-filter
             */
            "backdrop-filter": [{
                "backdrop-filter": ["", "none"]
            }],
            /**
             * Backdrop Blur
             * @see https://tailwindcss.com/docs/backdrop-blur
             */
            "backdrop-blur": [{
                "backdrop-blur": [blur]
            }],
            /**
             * Backdrop Brightness
             * @see https://tailwindcss.com/docs/backdrop-brightness
             */
            "backdrop-brightness": [{
                "backdrop-brightness": [brightness]
            }],
            /**
             * Backdrop Contrast
             * @see https://tailwindcss.com/docs/backdrop-contrast
             */
            "backdrop-contrast": [{
                "backdrop-contrast": [contrast]
            }],
            /**
             * Backdrop Grayscale
             * @see https://tailwindcss.com/docs/backdrop-grayscale
             */
            "backdrop-grayscale": [{
                "backdrop-grayscale": [grayscale]
            }],
            /**
             * Backdrop Hue Rotate
             * @see https://tailwindcss.com/docs/backdrop-hue-rotate
             */
            "backdrop-hue-rotate": [{
                "backdrop-hue-rotate": [hueRotate]
            }],
            /**
             * Backdrop Invert
             * @see https://tailwindcss.com/docs/backdrop-invert
             */
            "backdrop-invert": [{
                "backdrop-invert": [invert]
            }],
            /**
             * Backdrop Opacity
             * @see https://tailwindcss.com/docs/backdrop-opacity
             */
            "backdrop-opacity": [{
                "backdrop-opacity": [opacity]
            }],
            /**
             * Backdrop Saturate
             * @see https://tailwindcss.com/docs/backdrop-saturate
             */
            "backdrop-saturate": [{
                "backdrop-saturate": [saturate]
            }],
            /**
             * Backdrop Sepia
             * @see https://tailwindcss.com/docs/backdrop-sepia
             */
            "backdrop-sepia": [{
                "backdrop-sepia": [sepia]
            }],
            // Tables
            /**
             * Border Collapse
             * @see https://tailwindcss.com/docs/border-collapse
             */
            "border-collapse": [{
                border: ["collapse", "separate"]
            }],
            /**
             * Border Spacing
             * @see https://tailwindcss.com/docs/border-spacing
             */
            "border-spacing": [{
                "border-spacing": [borderSpacing]
            }],
            /**
             * Border Spacing X
             * @see https://tailwindcss.com/docs/border-spacing
             */
            "border-spacing-x": [{
                "border-spacing-x": [borderSpacing]
            }],
            /**
             * Border Spacing Y
             * @see https://tailwindcss.com/docs/border-spacing
             */
            "border-spacing-y": [{
                "border-spacing-y": [borderSpacing]
            }],
            /**
             * Table Layout
             * @see https://tailwindcss.com/docs/table-layout
             */
            "table-layout": [{
                table: ["auto", "fixed"]
            }],
            /**
             * Caption Side
             * @see https://tailwindcss.com/docs/caption-side
             */
            caption: [{
                caption: ["top", "bottom"]
            }],
            // Transitions and Animation
            /**
             * Tranisition Property
             * @see https://tailwindcss.com/docs/transition-property
             */
            transition: [{
                transition: ["none", "all", "", "colors", "opacity", "shadow", "transform", isArbitraryValue]
            }],
            /**
             * Transition Duration
             * @see https://tailwindcss.com/docs/transition-duration
             */
            duration: [{
                duration: getNumberAndArbitrary()
            }],
            /**
             * Transition Timing Function
             * @see https://tailwindcss.com/docs/transition-timing-function
             */
            ease: [{
                ease: ["linear", "in", "out", "in-out", isArbitraryValue]
            }],
            /**
             * Transition Delay
             * @see https://tailwindcss.com/docs/transition-delay
             */
            delay: [{
                delay: getNumberAndArbitrary()
            }],
            /**
             * Animation
             * @see https://tailwindcss.com/docs/animation
             */
            animate: [{
                animate: ["none", "spin", "ping", "pulse", "bounce", isArbitraryValue]
            }],
            // Transforms
            /**
             * Transform
             * @see https://tailwindcss.com/docs/transform
             */
            transform: [{
                transform: ["", "gpu", "none"]
            }],
            /**
             * Scale
             * @see https://tailwindcss.com/docs/scale
             */
            scale: [{
                scale: [scale]
            }],
            /**
             * Scale X
             * @see https://tailwindcss.com/docs/scale
             */
            "scale-x": [{
                "scale-x": [scale]
            }],
            /**
             * Scale Y
             * @see https://tailwindcss.com/docs/scale
             */
            "scale-y": [{
                "scale-y": [scale]
            }],
            /**
             * Rotate
             * @see https://tailwindcss.com/docs/rotate
             */
            rotate: [{
                rotate: [isInteger, isArbitraryValue]
            }],
            /**
             * Translate X
             * @see https://tailwindcss.com/docs/translate
             */
            "translate-x": [{
                "translate-x": [translate]
            }],
            /**
             * Translate Y
             * @see https://tailwindcss.com/docs/translate
             */
            "translate-y": [{
                "translate-y": [translate]
            }],
            /**
             * Skew X
             * @see https://tailwindcss.com/docs/skew
             */
            "skew-x": [{
                "skew-x": [skew]
            }],
            /**
             * Skew Y
             * @see https://tailwindcss.com/docs/skew
             */
            "skew-y": [{
                "skew-y": [skew]
            }],
            /**
             * Transform Origin
             * @see https://tailwindcss.com/docs/transform-origin
             */
            "transform-origin": [{
                origin: ["center", "top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left", "top-left", isArbitraryValue]
            }],
            // Interactivity
            /**
             * Accent Color
             * @see https://tailwindcss.com/docs/accent-color
             */
            accent: [{
                accent: ["auto", colors]
            }],
            /**
             * Appearance
             * @see https://tailwindcss.com/docs/appearance
             */
            appearance: ["appearance-none"],
            /**
             * Cursor
             * @see https://tailwindcss.com/docs/cursor
             */
            cursor: [{
                cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", isArbitraryValue]
            }],
            /**
             * Caret Color
             * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
             */
            "caret-color": [{
                caret: [colors]
            }],
            /**
             * Pointer Events
             * @see https://tailwindcss.com/docs/pointer-events
             */
            "pointer-events": [{
                "pointer-events": ["none", "auto"]
            }],
            /**
             * Resize
             * @see https://tailwindcss.com/docs/resize
             */
            resize: [{
                resize: ["none", "y", "x", ""]
            }],
            /**
             * Scroll Behavior
             * @see https://tailwindcss.com/docs/scroll-behavior
             */
            "scroll-behavior": [{
                scroll: ["auto", "smooth"]
            }],
            /**
             * Scroll Margin
             * @see https://tailwindcss.com/docs/scroll-margin
             */
            "scroll-m": [{
                "scroll-m": getSpacingWithArbitrary()
            }],
            /**
             * Scroll Margin X
             * @see https://tailwindcss.com/docs/scroll-margin
             */
            "scroll-mx": [{
                "scroll-mx": getSpacingWithArbitrary()
            }],
            /**
             * Scroll Margin Y
             * @see https://tailwindcss.com/docs/scroll-margin
             */
            "scroll-my": [{
                "scroll-my": getSpacingWithArbitrary()
            }],
            /**
             * Scroll Margin Start
             * @see https://tailwindcss.com/docs/scroll-margin
             */
            "scroll-ms": [{
                "scroll-ms": getSpacingWithArbitrary()
            }],
            /**
             * Scroll Margin End
             * @see https://tailwindcss.com/docs/scroll-margin
             */
            "scroll-me": [{
                "scroll-me": getSpacingWithArbitrary()
            }],
            /**
             * Scroll Margin Top
             * @see https://tailwindcss.com/docs/scroll-margin
             */
            "scroll-mt": [{
                "scroll-mt": getSpacingWithArbitrary()
            }],
            /**
             * Scroll Margin Right
             * @see https://tailwindcss.com/docs/scroll-margin
             */
            "scroll-mr": [{
                "scroll-mr": getSpacingWithArbitrary()
            }],
            /**
             * Scroll Margin Bottom
             * @see https://tailwindcss.com/docs/scroll-margin
             */
            "scroll-mb": [{
                "scroll-mb": getSpacingWithArbitrary()
            }],
            /**
             * Scroll Margin Left
             * @see https://tailwindcss.com/docs/scroll-margin
             */
            "scroll-ml": [{
                "scroll-ml": getSpacingWithArbitrary()
            }],
            /**
             * Scroll Padding
             * @see https://tailwindcss.com/docs/scroll-padding
             */
            "scroll-p": [{
                "scroll-p": getSpacingWithArbitrary()
            }],
            /**
             * Scroll Padding X
             * @see https://tailwindcss.com/docs/scroll-padding
             */
            "scroll-px": [{
                "scroll-px": getSpacingWithArbitrary()
            }],
            /**
             * Scroll Padding Y
             * @see https://tailwindcss.com/docs/scroll-padding
             */
            "scroll-py": [{
                "scroll-py": getSpacingWithArbitrary()
            }],
            /**
             * Scroll Padding Start
             * @see https://tailwindcss.com/docs/scroll-padding
             */
            "scroll-ps": [{
                "scroll-ps": getSpacingWithArbitrary()
            }],
            /**
             * Scroll Padding End
             * @see https://tailwindcss.com/docs/scroll-padding
             */
            "scroll-pe": [{
                "scroll-pe": getSpacingWithArbitrary()
            }],
            /**
             * Scroll Padding Top
             * @see https://tailwindcss.com/docs/scroll-padding
             */
            "scroll-pt": [{
                "scroll-pt": getSpacingWithArbitrary()
            }],
            /**
             * Scroll Padding Right
             * @see https://tailwindcss.com/docs/scroll-padding
             */
            "scroll-pr": [{
                "scroll-pr": getSpacingWithArbitrary()
            }],
            /**
             * Scroll Padding Bottom
             * @see https://tailwindcss.com/docs/scroll-padding
             */
            "scroll-pb": [{
                "scroll-pb": getSpacingWithArbitrary()
            }],
            /**
             * Scroll Padding Left
             * @see https://tailwindcss.com/docs/scroll-padding
             */
            "scroll-pl": [{
                "scroll-pl": getSpacingWithArbitrary()
            }],
            /**
             * Scroll Snap Align
             * @see https://tailwindcss.com/docs/scroll-snap-align
             */
            "snap-align": [{
                snap: ["start", "end", "center", "align-none"]
            }],
            /**
             * Scroll Snap Stop
             * @see https://tailwindcss.com/docs/scroll-snap-stop
             */
            "snap-stop": [{
                snap: ["normal", "always"]
            }],
            /**
             * Scroll Snap Type
             * @see https://tailwindcss.com/docs/scroll-snap-type
             */
            "snap-type": [{
                snap: ["none", "x", "y", "both"]
            }],
            /**
             * Scroll Snap Type Strictness
             * @see https://tailwindcss.com/docs/scroll-snap-type
             */
            "snap-strictness": [{
                snap: ["mandatory", "proximity"]
            }],
            /**
             * Touch Action
             * @see https://tailwindcss.com/docs/touch-action
             */
            touch: [{
                touch: ["auto", "none", "manipulation"]
            }],
            /**
             * Touch Action X
             * @see https://tailwindcss.com/docs/touch-action
             */
            "touch-x": [{
                "touch-pan": ["x", "left", "right"]
            }],
            /**
             * Touch Action Y
             * @see https://tailwindcss.com/docs/touch-action
             */
            "touch-y": [{
                "touch-pan": ["y", "up", "down"]
            }],
            /**
             * Touch Action Pinch Zoom
             * @see https://tailwindcss.com/docs/touch-action
             */
            "touch-pz": ["touch-pinch-zoom"],
            /**
             * User Select
             * @see https://tailwindcss.com/docs/user-select
             */
            select: [{
                select: ["none", "text", "all", "auto"]
            }],
            /**
             * Will Change
             * @see https://tailwindcss.com/docs/will-change
             */
            "will-change": [{
                "will-change": ["auto", "scroll", "contents", "transform", isArbitraryValue]
            }],
            // SVG
            /**
             * Fill
             * @see https://tailwindcss.com/docs/fill
             */
            fill: [{
                fill: [colors, "none"]
            }],
            /**
             * Stroke Width
             * @see https://tailwindcss.com/docs/stroke-width
             */
            "stroke-w": [{
                stroke: [isLength, isArbitraryLength, isArbitraryNumber]
            }],
            /**
             * Stroke
             * @see https://tailwindcss.com/docs/stroke
             */
            stroke: [{
                stroke: [colors, "none"]
            }],
            // Accessibility
            /**
             * Screen Readers
             * @see https://tailwindcss.com/docs/screen-readers
             */
            sr: ["sr-only", "not-sr-only"]
        },
        conflictingClassGroups: {
            overflow: ["overflow-x", "overflow-y"],
            overscroll: ["overscroll-x", "overscroll-y"],
            inset: ["inset-x", "inset-y", "start", "end", "top", "right", "bottom", "left"],
            "inset-x": ["right", "left"],
            "inset-y": ["top", "bottom"],
            flex: ["basis", "grow", "shrink"],
            gap: ["gap-x", "gap-y"],
            p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"],
            px: ["pr", "pl"],
            py: ["pt", "pb"],
            m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"],
            mx: ["mr", "ml"],
            my: ["mt", "mb"],
            "font-size": ["leading"],
            "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
            "fvn-ordinal": ["fvn-normal"],
            "fvn-slashed-zero": ["fvn-normal"],
            "fvn-figure": ["fvn-normal"],
            "fvn-spacing": ["fvn-normal"],
            "fvn-fraction": ["fvn-normal"],
            rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
            "rounded-s": ["rounded-ss", "rounded-es"],
            "rounded-e": ["rounded-se", "rounded-ee"],
            "rounded-t": ["rounded-tl", "rounded-tr"],
            "rounded-r": ["rounded-tr", "rounded-br"],
            "rounded-b": ["rounded-br", "rounded-bl"],
            "rounded-l": ["rounded-tl", "rounded-bl"],
            "border-spacing": ["border-spacing-x", "border-spacing-y"],
            "border-w": ["border-w-s", "border-w-e", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
            "border-w-x": ["border-w-r", "border-w-l"],
            "border-w-y": ["border-w-t", "border-w-b"],
            "border-color": ["border-color-t", "border-color-r", "border-color-b", "border-color-l"],
            "border-color-x": ["border-color-r", "border-color-l"],
            "border-color-y": ["border-color-t", "border-color-b"],
            "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
            "scroll-mx": ["scroll-mr", "scroll-ml"],
            "scroll-my": ["scroll-mt", "scroll-mb"],
            "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
            "scroll-px": ["scroll-pr", "scroll-pl"],
            "scroll-py": ["scroll-pt", "scroll-pb"],
            touch: ["touch-x", "touch-y", "touch-pz"],
            "touch-x": ["touch"],
            "touch-y": ["touch"],
            "touch-pz": ["touch"]
        },
        conflictingClassGroupModifiers: {
            "font-size": ["leading"]
        }
    };
}

const twMerge = /* @__PURE__ */ createTailwindMerge(getDefaultConfig);
const Frame = create_ssr_component(($$result, $$props, $$bindings, slots) => {
    let $$restProps = compute_rest_props($$props, [
        "tag",
        "color",
        "rounded",
        "border",
        "shadow",
        "transition",
        "params",
        "node",
        "use",
        "options",
        "role"
    ]);
    const null_transition = () => ({duration: 0});
    const noop = () => {
    };
    setContext("background", true);
    let {tag = $$restProps.href ? "a" : "div"} = $$props;
    let {color = "default"} = $$props;
    let {rounded = false} = $$props;
    let {border = false} = $$props;
    let {shadow = false} = $$props;
    let {transition = null_transition} = $$props;
    let {params = {}} = $$props;
    let {node = void 0} = $$props;
    let {use = noop} = $$props;
    let {options = {}} = $$props;
    let {role = void 0} = $$props;
    const bgColors = {
        gray: "bg-gray-50 dark:bg-gray-800",
        red: "bg-red-50 dark:bg-gray-800",
        yellow: "bg-yellow-50 dark:bg-gray-800 ",
        green: "bg-green-50 dark:bg-gray-800 ",
        indigo: "bg-indigo-50 dark:bg-gray-800 ",
        purple: "bg-purple-50 dark:bg-gray-800 ",
        pink: "bg-pink-50 dark:bg-gray-800 ",
        blue: "bg-blue-50 dark:bg-gray-800 ",
        light: "bg-gray-50 dark:bg-gray-700",
        dark: "bg-gray-50 dark:bg-gray-800",
        default: "bg-white dark:bg-gray-800",
        dropdown: "bg-white dark:bg-gray-700",
        navbar: "bg-white dark:bg-gray-900",
        navbarUl: "bg-gray-50 dark:bg-gray-800",
        form: "bg-gray-50 dark:bg-gray-700",
        primary: "bg-primary-50 dark:bg-gray-800 ",
        orange: "bg-orange-50 dark:bg-orange-800",
        none: ""
    };
    const textColors = {
        gray: "text-gray-800 dark:text-gray-300",
        red: "text-red-800 dark:text-red-400",
        yellow: "text-yellow-800 dark:text-yellow-300",
        green: "text-green-800 dark:text-green-400",
        indigo: "text-indigo-800 dark:text-indigo-400",
        purple: "text-purple-800 dark:text-purple-400",
        pink: "text-pink-800 dark:text-pink-400",
        blue: "text-blue-800 dark:text-blue-400",
        light: "text-gray-700 dark:text-gray-300",
        dark: "text-gray-700 dark:text-gray-300",
        default: "text-gray-500 dark:text-gray-400",
        dropdown: "text-gray-700 dark:text-gray-200",
        navbar: "text-gray-700 dark:text-gray-200",
        navbarUl: "text-gray-700 dark:text-gray-400",
        form: "text-gray-900 dark:text-white",
        primary: "text-primary-800 dark:text-primary-400",
        orange: "text-orange-800 dark:text-orange-400",
        none: ""
    };
    const borderColors = {
        gray: "border-gray-300 dark:border-gray-800 divide-gray-300 dark:divide-gray-800",
        red: "border-red-300 dark:border-red-800 divide-red-300 dark:divide-red-800",
        yellow: "border-yellow-300 dark:border-yellow-800 divide-yellow-300 dark:divide-yellow-800",
        green: "border-green-300 dark:border-green-800 divide-green-300 dark:divide-green-800",
        indigo: "border-indigo-300 dark:border-indigo-800 divide-indigo-300 dark:divide-indigo-800",
        purple: "border-purple-300 dark:border-purple-800 divide-purple-300 dark:divide-purple-800",
        pink: "border-pink-300 dark:border-pink-800 divide-pink-300 dark:divide-pink-800",
        blue: "border-blue-300 dark:border-blue-800 divide-blue-300 dark:divide-blue-800",
        light: "border-gray-500 divide-gray-500",
        dark: "border-gray-500 divide-gray-500",
        default: "border-gray-200 dark:border-gray-700 divide-gray-200 dark:divide-gray-700",
        dropdown: "border-gray-100 dark:border-gray-600 divide-gray-100 dark:divide-gray-600",
        navbar: "border-gray-100 dark:border-gray-700 divide-gray-100 dark:divide-gray-700",
        navbarUl: "border-gray-100 dark:border-gray-700 divide-gray-100 dark:divide-gray-700",
        form: "border-gray-300 dark:border-gray-700 divide-gray-300 dark:divide-gray-700",
        primary: "border-primary-500 dark:border-primary-200  divide-primary-500 dark:divide-primary-200 ",
        orange: "border-orange-300 dark:border-orange-800 divide-orange-300 dark:divide-orange-800",
        none: ""
    };
    let divClass;
    if ($$props.tag === void 0 && $$bindings.tag && tag !== void 0)
        $$bindings.tag(tag);
    if ($$props.color === void 0 && $$bindings.color && color !== void 0)
        $$bindings.color(color);
    if ($$props.rounded === void 0 && $$bindings.rounded && rounded !== void 0)
        $$bindings.rounded(rounded);
    if ($$props.border === void 0 && $$bindings.border && border !== void 0)
        $$bindings.border(border);
    if ($$props.shadow === void 0 && $$bindings.shadow && shadow !== void 0)
        $$bindings.shadow(shadow);
    if ($$props.transition === void 0 && $$bindings.transition && transition !== void 0)
        $$bindings.transition(transition);
    if ($$props.params === void 0 && $$bindings.params && params !== void 0)
        $$bindings.params(params);
    if ($$props.node === void 0 && $$bindings.node && node !== void 0)
        $$bindings.node(node);
    if ($$props.use === void 0 && $$bindings.use && use !== void 0)
        $$bindings.use(use);
    if ($$props.options === void 0 && $$bindings.options && options !== void 0)
        $$bindings.options(options);
    if ($$props.role === void 0 && $$bindings.role && role !== void 0)
        $$bindings.role(role);
    color = color ?? "default";
    {
        setContext("color", color);
    }
    divClass = twMerge(bgColors[color], textColors[color], rounded && "rounded-lg", border && "border", borderColors[color], shadow && "shadow-md", $$props.class);
    return `${((tag$1) => {
        return tag$1 ? `<${tag}${spread(
            [
                escape_object($$restProps),
                {class: escape_attribute_value(divClass)},
                {role: escape_attribute_value(role)}
            ],
            {}
        )}${add_attribute("this", node, 0)}>${is_void(tag$1) ? "" : `${slots.default ? slots.default({}) : ``}`}${is_void(tag$1) ? "" : `</${tag$1}>`}` : "";
    })(tag)} `;
});
const Button = create_ssr_component(($$result, $$props, $$bindings, slots) => {
    let $$restProps = compute_rest_props($$props, ["pill", "outline", "size", "href", "type", "color", "shadow", "tag", "checked"]);
    const group = getContext("group");
    let {pill = false} = $$props;
    let {outline = false} = $$props;
    let {size = group ? "sm" : "md"} = $$props;
    let {href = void 0} = $$props;
    let {type = "button"} = $$props;
    let {color = group ? outline ? "dark" : "alternative" : "primary"} = $$props;
    let {shadow = false} = $$props;
    let {tag = "button"} = $$props;
    let {checked = void 0} = $$props;
    const colorClasses = {
        alternative: "text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400 hover:text-primary-700 focus-within:text-primary-700 dark:focus-within:text-white dark:hover:text-white",
        blue: "text-white bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700",
        dark: "text-white bg-gray-800 hover:bg-gray-900 dark:bg-gray-800 dark:hover:bg-gray-700",
        green: "text-white bg-green-700 hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700",
        light: "text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600",
        primary: "text-white bg-primary-700 hover:bg-primary-800 dark:bg-primary-600 dark:hover:bg-primary-700",
        purple: "text-white bg-purple-700 hover:bg-purple-800 dark:bg-purple-600 dark:hover:bg-purple-700",
        red: "text-white bg-red-700 hover:bg-red-800 dark:bg-red-600 dark:hover:bg-red-700",
        yellow: "text-white bg-yellow-400 hover:bg-yellow-500 ",
        none: ""
    };
    const colorCheckedClasses = {
        alternative: "text-primary-700 border dark:text-primary-500 bg-gray-100 dark:bg-gray-700 border-gray-300 shadow-gray-300 dark:shadow-gray-800 shadow-inner",
        blue: "text-blue-900 bg-blue-400 dark:bg-blue-500 shadow-blue-700 dark:shadow-blue-800 shadow-inner",
        dark: "text-white bg-gray-500 dark:bg-gray-600 shadow-gray-800 dark:shadow-gray-900 shadow-inner",
        green: "text-green-900 bg-green-400 dark:bg-green-500 shadow-green-700 dark:shadow-green-800 shadow-inner",
        light: "text-gray-900 bg-gray-100 border border-gray-300 dark:bg-gray-500 dark:text-gray-900 dark:border-gray-700 shadow-gray-300 dark:shadow-gray-700 shadow-inner",
        primary: "text-primary-900 bg-primary-400 dark:bg-primary-500 shadow-primary-700 dark:shadow-primary-800 shadow-inner",
        purple: "text-purple-900 bg-purple-400 dark:bg-purple-500 shadow-purple-700 dark:shadow-purple-800 shadow-inner",
        red: "text-red-900 bg-red-400 dark:bg-red-500 shadow-red-700 dark:shadow-red-800 shadow-inner",
        yellow: "text-yellow-900 bg-yellow-300 dark:bg-yellow-400 shadow-yellow-500 dark:shadow-yellow-700 shadow-inner",
        none: ""
    };
    const coloredFocusClasses = {
        alternative: "focus-within:ring-gray-200 dark:focus-within:ring-gray-700",
        blue: "focus-within:ring-blue-300 dark:focus-within:ring-blue-800",
        dark: "focus-within:ring-gray-300 dark:focus-within:ring-gray-700",
        green: "focus-within:ring-green-300 dark:focus-within:ring-green-800",
        light: "focus-within:ring-gray-200 dark:focus-within:ring-gray-700",
        primary: "focus-within:ring-primary-300 dark:focus-within:ring-primary-800",
        purple: "focus-within:ring-purple-300 dark:focus-within:ring-purple-900",
        red: "focus-within:ring-red-300 dark:focus-within:ring-red-900",
        yellow: "focus-within:ring-yellow-300 dark:focus-within:ring-yellow-900",
        none: ""
    };
    const coloredShadowClasses = {
        alternative: "shadow-gray-500/50 dark:shadow-gray-800/80",
        blue: "shadow-blue-500/50 dark:shadow-blue-800/80",
        dark: "shadow-gray-500/50 dark:shadow-gray-800/80",
        green: "shadow-green-500/50 dark:shadow-green-800/80",
        light: "shadow-gray-500/50 dark:shadow-gray-800/80",
        primary: "shadow-primary-500/50 dark:shadow-primary-800/80",
        purple: "shadow-purple-500/50 dark:shadow-purple-800/80",
        red: "shadow-red-500/50 dark:shadow-red-800/80 ",
        yellow: "shadow-yellow-500/50 dark:shadow-yellow-800/80 ",
        none: ""
    };
    const outlineClasses = {
        alternative: "text-gray-900 dark:text-gray-400 hover:text-white border border-gray-800 hover:bg-gray-900 focus-within:bg-gray-900 focus-within:text-white focus-within:ring-gray-300 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-600 dark:focus-within:ring-gray-800",
        blue: "text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600",
        dark: "text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus-within:bg-gray-900 focus-within:text-white dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-600",
        green: "text-green-700 hover:text-white border border-green-700 hover:bg-green-800 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600",
        light: "text-gray-500 hover:text-gray-900 bg-white border border-gray-200 dark:border-gray-600 dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600",
        primary: "text-primary-700 hover:text-white border border-primary-700 hover:bg-primary-700 dark:border-primary-500 dark:text-primary-500 dark:hover:text-white dark:hover:bg-primary-600",
        purple: "text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500",
        red: "text-red-700 hover:text-white border border-red-700 hover:bg-red-800 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600",
        yellow: "text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400",
        none: ""
    };
    const sizeClasses = {
        xs: "px-3 py-2 text-xs",
        sm: "px-4 py-2 text-sm",
        md: "px-5 py-2.5 text-sm",
        lg: "px-5 py-3 text-base",
        xl: "px-6 py-3.5 text-base"
    };
    const hasBorder = () => outline || color === "alternative" || color === "light";
    let buttonClass;
    if ($$props.pill === void 0 && $$bindings.pill && pill !== void 0)
        $$bindings.pill(pill);
    if ($$props.outline === void 0 && $$bindings.outline && outline !== void 0)
        $$bindings.outline(outline);
    if ($$props.size === void 0 && $$bindings.size && size !== void 0)
        $$bindings.size(size);
    if ($$props.href === void 0 && $$bindings.href && href !== void 0)
        $$bindings.href(href);
    if ($$props.type === void 0 && $$bindings.type && type !== void 0)
        $$bindings.type(type);
    if ($$props.color === void 0 && $$bindings.color && color !== void 0)
        $$bindings.color(color);
    if ($$props.shadow === void 0 && $$bindings.shadow && shadow !== void 0)
        $$bindings.shadow(shadow);
    if ($$props.tag === void 0 && $$bindings.tag && tag !== void 0)
        $$bindings.tag(tag);
    if ($$props.checked === void 0 && $$bindings.checked && checked !== void 0)
        $$bindings.checked(checked);
    buttonClass = twMerge(
        "text-center font-medium",
        group ? "focus-within:ring-2" : "focus-within:ring-4",
        group && "focus-within:z-10",
        group || "focus-within:outline-none",
        "inline-flex items-center justify-center " + sizeClasses[size],
        outline && checked && "border dark:border-gray-900",
        outline && checked && colorCheckedClasses[color],
        outline && !checked && outlineClasses[color],
        !outline && checked && colorCheckedClasses[color],
        !outline && !checked && colorClasses[color],
        color === "alternative" && (group && !checked ? "dark:bg-gray-700 dark:text-white dark:border-gray-700 dark:hover:border-gray-600 dark:hover:bg-gray-600" : "dark:bg-transparent dark:border-gray-600 dark:hover:border-gray-700"),
        outline && color === "dark" && (group ? checked ? "bg-gray-900 border-gray-800 dark:border-white dark:bg-gray-600" : "dark:text-white border-gray-800 dark:border-white" : "dark:text-gray-400 dark:border-gray-700"),
        coloredFocusClasses[color],
        hasBorder() && group && "border-l-0 first:border-l",
        group ? pill && "first:rounded-l-full last:rounded-r-full" || "first:rounded-l-lg last:rounded-r-lg" : pill && "rounded-full" || "rounded-lg",
        shadow && "shadow-lg",
        shadow && coloredShadowClasses[color],
        $$props.disabled && "cursor-not-allowed opacity-50",
        $$props.class
    );
    return `${href ? `<a${spread(
        [
            {href: escape_attribute_value(href)},
            escape_object($$restProps),
            {
                class: escape_attribute_value(buttonClass)
            },
            {role: "button"}
        ],
        {}
    )}>${slots.default ? slots.default({}) : ``}</a>` : `${tag === "button" ? `<button${spread(
        [
            {type: escape_attribute_value(type)},
            escape_object($$restProps),
            {
                class: escape_attribute_value(buttonClass)
            }
        ],
        {}
    )}>${slots.default ? slots.default({}) : ``}</button>` : `${((tag$1) => {
        return tag$1 ? `<${tag}${spread(
            [
                escape_object($$restProps),
                {
                    class: escape_attribute_value(buttonClass)
                }
            ],
            {}
        )}>${is_void(tag$1) ? "" : `${slots.default ? slots.default({}) : ``}`}${is_void(tag$1) ? "" : `</${tag$1}>`}` : "";
    })(tag)}`}`} `;
});
const min = Math.min;
const max = Math.max;
const round = Math.round;
const floor = Math.floor;
const createCoords = (v) => ({
    x: v,
    y: v
});
const oppositeSideMap = {
    left: "right",
    right: "left",
    bottom: "top",
    top: "bottom"
};
const oppositeAlignmentMap = {
    start: "end",
    end: "start"
};

function clamp(start, value, end) {
    return max(start, min(value, end));
}

function evaluate(value, param) {
    return typeof value === "function" ? value(param) : value;
}

function getSide(placement) {
    return placement.split("-")[0];
}

function getAlignment(placement) {
    return placement.split("-")[1];
}

function getOppositeAxis(axis) {
    return axis === "x" ? "y" : "x";
}

function getAxisLength(axis) {
    return axis === "y" ? "height" : "width";
}

function getSideAxis(placement) {
    return ["top", "bottom"].includes(getSide(placement)) ? "y" : "x";
}

function getAlignmentAxis(placement) {
    return getOppositeAxis(getSideAxis(placement));
}

function getAlignmentSides(placement, rects, rtl) {
    if (rtl === void 0) {
        rtl = false;
    }
    const alignment = getAlignment(placement);
    const alignmentAxis = getAlignmentAxis(placement);
    const length = getAxisLength(alignmentAxis);
    let mainAlignmentSide = alignmentAxis === "x" ? alignment === (rtl ? "end" : "start") ? "right" : "left" : alignment === "start" ? "bottom" : "top";
    if (rects.reference[length] > rects.floating[length]) {
        mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
    }
    return [mainAlignmentSide, getOppositePlacement(mainAlignmentSide)];
}

function getExpandedPlacements(placement) {
    const oppositePlacement = getOppositePlacement(placement);
    return [getOppositeAlignmentPlacement(placement), oppositePlacement, getOppositeAlignmentPlacement(oppositePlacement)];
}

function getOppositeAlignmentPlacement(placement) {
    return placement.replace(/start|end/g, (alignment) => oppositeAlignmentMap[alignment]);
}

function getSideList(side, isStart, rtl) {
    const lr = ["left", "right"];
    const rl = ["right", "left"];
    const tb = ["top", "bottom"];
    const bt = ["bottom", "top"];
    switch (side) {
        case "top":
        case "bottom":
            if (rtl)
                return isStart ? rl : lr;
            return isStart ? lr : rl;
        case "left":
        case "right":
            return isStart ? tb : bt;
        default:
            return [];
    }
}

function getOppositeAxisPlacements(placement, flipAlignment, direction, rtl) {
    const alignment = getAlignment(placement);
    let list = getSideList(getSide(placement), direction === "start", rtl);
    if (alignment) {
        list = list.map((side) => side + "-" + alignment);
        if (flipAlignment) {
            list = list.concat(list.map(getOppositeAlignmentPlacement));
        }
    }
    return list;
}

function getOppositePlacement(placement) {
    return placement.replace(/left|right|bottom|top/g, (side) => oppositeSideMap[side]);
}

function expandPaddingObject(padding) {
    return {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        ...padding
    };
}

function getPaddingObject(padding) {
    return typeof padding !== "number" ? expandPaddingObject(padding) : {
        top: padding,
        right: padding,
        bottom: padding,
        left: padding
    };
}

function rectToClientRect(rect) {
    return {
        ...rect,
        top: rect.y,
        left: rect.x,
        right: rect.x + rect.width,
        bottom: rect.y + rect.height
    };
}

function computeCoordsFromPlacement(_ref, placement, rtl) {
    let {
        reference,
        floating
    } = _ref;
    const sideAxis = getSideAxis(placement);
    const alignmentAxis = getAlignmentAxis(placement);
    const alignLength = getAxisLength(alignmentAxis);
    const side = getSide(placement);
    const isVertical = sideAxis === "y";
    const commonX = reference.x + reference.width / 2 - floating.width / 2;
    const commonY = reference.y + reference.height / 2 - floating.height / 2;
    const commonAlign = reference[alignLength] / 2 - floating[alignLength] / 2;
    let coords;
    switch (side) {
        case "top":
            coords = {
                x: commonX,
                y: reference.y - floating.height
            };
            break;
        case "bottom":
            coords = {
                x: commonX,
                y: reference.y + reference.height
            };
            break;
        case "right":
            coords = {
                x: reference.x + reference.width,
                y: commonY
            };
            break;
        case "left":
            coords = {
                x: reference.x - floating.width,
                y: commonY
            };
            break;
        default:
            coords = {
                x: reference.x,
                y: reference.y
            };
    }
    switch (getAlignment(placement)) {
        case "start":
            coords[alignmentAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
            break;
        case "end":
            coords[alignmentAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
            break;
    }
    return coords;
}

const computePosition$1 = async (reference, floating, config) => {
    const {
        placement = "bottom",
        strategy = "absolute",
        middleware = [],
        platform: platform2
    } = config;
    const validMiddleware = middleware.filter(Boolean);
    const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(floating));
    let rects = await platform2.getElementRects({
        reference,
        floating,
        strategy
    });
    let {
        x,
        y
    } = computeCoordsFromPlacement(rects, placement, rtl);
    let statefulPlacement = placement;
    let middlewareData = {};
    let resetCount = 0;
    for (let i = 0; i < validMiddleware.length; i++) {
        const {
            name,
            fn
        } = validMiddleware[i];
        const {
            x: nextX,
            y: nextY,
            data,
            reset
        } = await fn({
            x,
            y,
            initialPlacement: placement,
            placement: statefulPlacement,
            strategy,
            middlewareData,
            rects,
            platform: platform2,
            elements: {
                reference,
                floating
            }
        });
        x = nextX != null ? nextX : x;
        y = nextY != null ? nextY : y;
        middlewareData = {
            ...middlewareData,
            [name]: {
                ...middlewareData[name],
                ...data
            }
        };
        if (reset && resetCount <= 50) {
            resetCount++;
            if (typeof reset === "object") {
                if (reset.placement) {
                    statefulPlacement = reset.placement;
                }
                if (reset.rects) {
                    rects = reset.rects === true ? await platform2.getElementRects({
                        reference,
                        floating,
                        strategy
                    }) : reset.rects;
                }
                ({
                    x,
                    y
                } = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
            }
            i = -1;
            continue;
        }
    }
    return {
        x,
        y,
        placement: statefulPlacement,
        strategy,
        middlewareData
    };
};

async function detectOverflow(state, options) {
    var _await$platform$isEle;
    if (options === void 0) {
        options = {};
    }
    const {
        x,
        y,
        platform: platform2,
        rects,
        elements,
        strategy
    } = state;
    const {
        boundary = "clippingAncestors",
        rootBoundary = "viewport",
        elementContext = "floating",
        altBoundary = false,
        padding = 0
    } = evaluate(options, state);
    const paddingObject = getPaddingObject(padding);
    const altContext = elementContext === "floating" ? "reference" : "floating";
    const element = elements[altBoundary ? altContext : elementContext];
    const clippingClientRect = rectToClientRect(await platform2.getClippingRect({
        element: ((_await$platform$isEle = await (platform2.isElement == null ? void 0 : platform2.isElement(element))) != null ? _await$platform$isEle : true) ? element : element.contextElement || await (platform2.getDocumentElement == null ? void 0 : platform2.getDocumentElement(elements.floating)),
        boundary,
        rootBoundary,
        strategy
    }));
    const rect = elementContext === "floating" ? {
        ...rects.floating,
        x,
        y
    } : rects.reference;
    const offsetParent = await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(elements.floating));
    const offsetScale = await (platform2.isElement == null ? void 0 : platform2.isElement(offsetParent)) ? await (platform2.getScale == null ? void 0 : platform2.getScale(offsetParent)) || {
        x: 1,
        y: 1
    } : {
        x: 1,
        y: 1
    };
    const elementClientRect = rectToClientRect(platform2.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform2.convertOffsetParentRelativeRectToViewportRelativeRect({
        rect,
        offsetParent,
        strategy
    }) : rect);
    return {
        top: (clippingClientRect.top - elementClientRect.top + paddingObject.top) / offsetScale.y,
        bottom: (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) / offsetScale.y,
        left: (clippingClientRect.left - elementClientRect.left + paddingObject.left) / offsetScale.x,
        right: (elementClientRect.right - clippingClientRect.right + paddingObject.right) / offsetScale.x
    };
}

const flip = function (options) {
    if (options === void 0) {
        options = {};
    }
    return {
        name: "flip",
        options,
        async fn(state) {
            var _middlewareData$arrow, _middlewareData$flip;
            const {
                placement,
                middlewareData,
                rects,
                initialPlacement,
                platform: platform2,
                elements
            } = state;
            const {
                mainAxis: checkMainAxis = true,
                crossAxis: checkCrossAxis = true,
                fallbackPlacements: specifiedFallbackPlacements,
                fallbackStrategy = "bestFit",
                fallbackAxisSideDirection = "none",
                flipAlignment = true,
                ...detectOverflowOptions
            } = evaluate(options, state);
            if ((_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
                return {};
            }
            const side = getSide(placement);
            const isBasePlacement = getSide(initialPlacement) === initialPlacement;
            const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
            const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
            if (!specifiedFallbackPlacements && fallbackAxisSideDirection !== "none") {
                fallbackPlacements.push(...getOppositeAxisPlacements(initialPlacement, flipAlignment, fallbackAxisSideDirection, rtl));
            }
            const placements = [initialPlacement, ...fallbackPlacements];
            const overflow = await detectOverflow(state, detectOverflowOptions);
            const overflows = [];
            let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];
            if (checkMainAxis) {
                overflows.push(overflow[side]);
            }
            if (checkCrossAxis) {
                const sides = getAlignmentSides(placement, rects, rtl);
                overflows.push(overflow[sides[0]], overflow[sides[1]]);
            }
            overflowsData = [...overflowsData, {
                placement,
                overflows
            }];
            if (!overflows.every((side2) => side2 <= 0)) {
                var _middlewareData$flip2, _overflowsData$filter;
                const nextIndex = (((_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) || 0) + 1;
                const nextPlacement = placements[nextIndex];
                if (nextPlacement) {
                    return {
                        data: {
                            index: nextIndex,
                            overflows: overflowsData
                        },
                        reset: {
                            placement: nextPlacement
                        }
                    };
                }
                let resetPlacement = (_overflowsData$filter = overflowsData.filter((d) => d.overflows[0] <= 0).sort((a, b) => a.overflows[1] - b.overflows[1])[0]) == null ? void 0 : _overflowsData$filter.placement;
                if (!resetPlacement) {
                    switch (fallbackStrategy) {
                        case "bestFit": {
                            var _overflowsData$map$so;
                            const placement2 = (_overflowsData$map$so = overflowsData.map((d) => [d.placement, d.overflows.filter((overflow2) => overflow2 > 0).reduce((acc, overflow2) => acc + overflow2, 0)]).sort((a, b) => a[1] - b[1])[0]) == null ? void 0 : _overflowsData$map$so[0];
                            if (placement2) {
                                resetPlacement = placement2;
                            }
                            break;
                        }
                        case "initialPlacement":
                            resetPlacement = initialPlacement;
                            break;
                    }
                }
                if (placement !== resetPlacement) {
                    return {
                        reset: {
                            placement: resetPlacement
                        }
                    };
                }
            }
            return {};
        }
    };
};

async function convertValueToCoords(state, options) {
    const {
        placement,
        platform: platform2,
        elements
    } = state;
    const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
    const side = getSide(placement);
    const alignment = getAlignment(placement);
    const isVertical = getSideAxis(placement) === "y";
    const mainAxisMulti = ["left", "top"].includes(side) ? -1 : 1;
    const crossAxisMulti = rtl && isVertical ? -1 : 1;
    const rawValue = evaluate(options, state);
    let {
        mainAxis,
        crossAxis,
        alignmentAxis
    } = typeof rawValue === "number" ? {
        mainAxis: rawValue,
        crossAxis: 0,
        alignmentAxis: null
    } : {
        mainAxis: 0,
        crossAxis: 0,
        alignmentAxis: null,
        ...rawValue
    };
    if (alignment && typeof alignmentAxis === "number") {
        crossAxis = alignment === "end" ? alignmentAxis * -1 : alignmentAxis;
    }
    return isVertical ? {
        x: crossAxis * crossAxisMulti,
        y: mainAxis * mainAxisMulti
    } : {
        x: mainAxis * mainAxisMulti,
        y: crossAxis * crossAxisMulti
    };
}

const offset = function (options) {
    if (options === void 0) {
        options = 0;
    }
    return {
        name: "offset",
        options,
        async fn(state) {
            const {
                x,
                y
            } = state;
            const diffCoords = await convertValueToCoords(state, options);
            return {
                x: x + diffCoords.x,
                y: y + diffCoords.y,
                data: diffCoords
            };
        }
    };
};
const shift = function (options) {
    if (options === void 0) {
        options = {};
    }
    return {
        name: "shift",
        options,
        async fn(state) {
            const {
                x,
                y,
                placement
            } = state;
            const {
                mainAxis: checkMainAxis = true,
                crossAxis: checkCrossAxis = false,
                limiter = {
                    fn: (_ref) => {
                        let {
                            x: x2,
                            y: y2
                        } = _ref;
                        return {
                            x: x2,
                            y: y2
                        };
                    }
                },
                ...detectOverflowOptions
            } = evaluate(options, state);
            const coords = {
                x,
                y
            };
            const overflow = await detectOverflow(state, detectOverflowOptions);
            const crossAxis = getSideAxis(getSide(placement));
            const mainAxis = getOppositeAxis(crossAxis);
            let mainAxisCoord = coords[mainAxis];
            let crossAxisCoord = coords[crossAxis];
            if (checkMainAxis) {
                const minSide = mainAxis === "y" ? "top" : "left";
                const maxSide = mainAxis === "y" ? "bottom" : "right";
                const min2 = mainAxisCoord + overflow[minSide];
                const max2 = mainAxisCoord - overflow[maxSide];
                mainAxisCoord = clamp(min2, mainAxisCoord, max2);
            }
            if (checkCrossAxis) {
                const minSide = crossAxis === "y" ? "top" : "left";
                const maxSide = crossAxis === "y" ? "bottom" : "right";
                const min2 = crossAxisCoord + overflow[minSide];
                const max2 = crossAxisCoord - overflow[maxSide];
                crossAxisCoord = clamp(min2, crossAxisCoord, max2);
            }
            const limitedCoords = limiter.fn({
                ...state,
                [mainAxis]: mainAxisCoord,
                [crossAxis]: crossAxisCoord
            });
            return {
                ...limitedCoords,
                data: {
                    x: limitedCoords.x - x,
                    y: limitedCoords.y - y
                }
            };
        }
    };
};

function getNodeName(node) {
    if (isNode(node)) {
        return (node.nodeName || "").toLowerCase();
    }
    return "#document";
}

function getWindow(node) {
    var _node$ownerDocument;
    return (node == null ? void 0 : (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
}

function getDocumentElement(node) {
    var _ref;
    return (_ref = (isNode(node) ? node.ownerDocument : node.document) || window.document) == null ? void 0 : _ref.documentElement;
}

function isNode(value) {
    return value instanceof Node || value instanceof getWindow(value).Node;
}

function isElement(value) {
    return value instanceof Element || value instanceof getWindow(value).Element;
}

function isHTMLElement(value) {
    return value instanceof HTMLElement || value instanceof getWindow(value).HTMLElement;
}

function isShadowRoot(value) {
    if (typeof ShadowRoot === "undefined") {
        return false;
    }
    return value instanceof ShadowRoot || value instanceof getWindow(value).ShadowRoot;
}

function isOverflowElement(element) {
    const {
        overflow,
        overflowX,
        overflowY,
        display
    } = getComputedStyle(element);
    return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && !["inline", "contents"].includes(display);
}

function isTableElement(element) {
    return ["table", "td", "th"].includes(getNodeName(element));
}

function isContainingBlock(element) {
    const webkit = isWebKit();
    const css2 = getComputedStyle(element);
    return css2.transform !== "none" || css2.perspective !== "none" || (css2.containerType ? css2.containerType !== "normal" : false) || !webkit && (css2.backdropFilter ? css2.backdropFilter !== "none" : false) || !webkit && (css2.filter ? css2.filter !== "none" : false) || ["transform", "perspective", "filter"].some((value) => (css2.willChange || "").includes(value)) || ["paint", "layout", "strict", "content"].some((value) => (css2.contain || "").includes(value));
}

function getContainingBlock(element) {
    let currentNode = getParentNode(element);
    while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
        if (isContainingBlock(currentNode)) {
            return currentNode;
        } else {
            currentNode = getParentNode(currentNode);
        }
    }
    return null;
}

function isWebKit() {
    if (typeof CSS === "undefined" || !CSS.supports)
        return false;
    return CSS.supports("-webkit-backdrop-filter", "none");
}

function isLastTraversableNode(node) {
    return ["html", "body", "#document"].includes(getNodeName(node));
}

function getComputedStyle(element) {
    return getWindow(element).getComputedStyle(element);
}

function getNodeScroll(element) {
    if (isElement(element)) {
        return {
            scrollLeft: element.scrollLeft,
            scrollTop: element.scrollTop
        };
    }
    return {
        scrollLeft: element.pageXOffset,
        scrollTop: element.pageYOffset
    };
}

function getParentNode(node) {
    if (getNodeName(node) === "html") {
        return node;
    }
    const result = (
        // Step into the shadow DOM of the parent of a slotted node.
        node.assignedSlot || // DOM Element detected.
        node.parentNode || // ShadowRoot detected.
        isShadowRoot(node) && node.host || // Fallback.
        getDocumentElement(node)
    );
    return isShadowRoot(result) ? result.host : result;
}

function getNearestOverflowAncestor(node) {
    const parentNode = getParentNode(node);
    if (isLastTraversableNode(parentNode)) {
        return node.ownerDocument ? node.ownerDocument.body : node.body;
    }
    if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) {
        return parentNode;
    }
    return getNearestOverflowAncestor(parentNode);
}

function getOverflowAncestors(node, list, traverseIframes) {
    var _node$ownerDocument2;
    if (list === void 0) {
        list = [];
    }
    if (traverseIframes === void 0) {
        traverseIframes = true;
    }
    const scrollableAncestor = getNearestOverflowAncestor(node);
    const isBody = scrollableAncestor === ((_node$ownerDocument2 = node.ownerDocument) == null ? void 0 : _node$ownerDocument2.body);
    const win = getWindow(scrollableAncestor);
    if (isBody) {
        return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : [], win.frameElement && traverseIframes ? getOverflowAncestors(win.frameElement) : []);
    }
    return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor, [], traverseIframes));
}

function getCssDimensions(element) {
    const css2 = getComputedStyle(element);
    let width = parseFloat(css2.width) || 0;
    let height = parseFloat(css2.height) || 0;
    const hasOffset = isHTMLElement(element);
    const offsetWidth = hasOffset ? element.offsetWidth : width;
    const offsetHeight = hasOffset ? element.offsetHeight : height;
    const shouldFallback = round(width) !== offsetWidth || round(height) !== offsetHeight;
    if (shouldFallback) {
        width = offsetWidth;
        height = offsetHeight;
    }
    return {
        width,
        height,
        $: shouldFallback
    };
}

function unwrapElement(element) {
    return !isElement(element) ? element.contextElement : element;
}

function getScale(element) {
    const domElement = unwrapElement(element);
    if (!isHTMLElement(domElement)) {
        return createCoords(1);
    }
    const rect = domElement.getBoundingClientRect();
    const {
        width,
        height,
        $
    } = getCssDimensions(domElement);
    let x = ($ ? round(rect.width) : rect.width) / width;
    let y = ($ ? round(rect.height) : rect.height) / height;
    if (!x || !Number.isFinite(x)) {
        x = 1;
    }
    if (!y || !Number.isFinite(y)) {
        y = 1;
    }
    return {
        x,
        y
    };
}

const noOffsets = /* @__PURE__ */ createCoords(0);

function getVisualOffsets(element) {
    const win = getWindow(element);
    if (!isWebKit() || !win.visualViewport) {
        return noOffsets;
    }
    return {
        x: win.visualViewport.offsetLeft,
        y: win.visualViewport.offsetTop
    };
}

function shouldAddVisualOffsets(element, isFixed, floatingOffsetParent) {
    if (isFixed === void 0) {
        isFixed = false;
    }
    if (!floatingOffsetParent || isFixed && floatingOffsetParent !== getWindow(element)) {
        return false;
    }
    return isFixed;
}

function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
    if (includeScale === void 0) {
        includeScale = false;
    }
    if (isFixedStrategy === void 0) {
        isFixedStrategy = false;
    }
    const clientRect = element.getBoundingClientRect();
    const domElement = unwrapElement(element);
    let scale = createCoords(1);
    if (includeScale) {
        if (offsetParent) {
            if (isElement(offsetParent)) {
                scale = getScale(offsetParent);
            }
        } else {
            scale = getScale(element);
        }
    }
    const visualOffsets = shouldAddVisualOffsets(domElement, isFixedStrategy, offsetParent) ? getVisualOffsets(domElement) : createCoords(0);
    let x = (clientRect.left + visualOffsets.x) / scale.x;
    let y = (clientRect.top + visualOffsets.y) / scale.y;
    let width = clientRect.width / scale.x;
    let height = clientRect.height / scale.y;
    if (domElement) {
        const win = getWindow(domElement);
        const offsetWin = offsetParent && isElement(offsetParent) ? getWindow(offsetParent) : offsetParent;
        let currentIFrame = win.frameElement;
        while (currentIFrame && offsetParent && offsetWin !== win) {
            const iframeScale = getScale(currentIFrame);
            const iframeRect = currentIFrame.getBoundingClientRect();
            const css2 = getComputedStyle(currentIFrame);
            const left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css2.paddingLeft)) * iframeScale.x;
            const top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css2.paddingTop)) * iframeScale.y;
            x *= iframeScale.x;
            y *= iframeScale.y;
            width *= iframeScale.x;
            height *= iframeScale.y;
            x += left;
            y += top;
            currentIFrame = getWindow(currentIFrame).frameElement;
        }
    }
    return rectToClientRect({
        width,
        height,
        x,
        y
    });
}

function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
    let {
        rect,
        offsetParent,
        strategy
    } = _ref;
    const isOffsetParentAnElement = isHTMLElement(offsetParent);
    const documentElement = getDocumentElement(offsetParent);
    if (offsetParent === documentElement) {
        return rect;
    }
    let scroll = {
        scrollLeft: 0,
        scrollTop: 0
    };
    let scale = createCoords(1);
    const offsets = createCoords(0);
    if (isOffsetParentAnElement || !isOffsetParentAnElement && strategy !== "fixed") {
        if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
            scroll = getNodeScroll(offsetParent);
        }
        if (isHTMLElement(offsetParent)) {
            const offsetRect = getBoundingClientRect(offsetParent);
            scale = getScale(offsetParent);
            offsets.x = offsetRect.x + offsetParent.clientLeft;
            offsets.y = offsetRect.y + offsetParent.clientTop;
        }
    }
    return {
        width: rect.width * scale.x,
        height: rect.height * scale.y,
        x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x,
        y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y
    };
}

function getClientRects(element) {
    return Array.from(element.getClientRects());
}

function getWindowScrollBarX(element) {
    return getBoundingClientRect(getDocumentElement(element)).left + getNodeScroll(element).scrollLeft;
}

function getDocumentRect(element) {
    const html = getDocumentElement(element);
    const scroll = getNodeScroll(element);
    const body = element.ownerDocument.body;
    const width = max(html.scrollWidth, html.clientWidth, body.scrollWidth, body.clientWidth);
    const height = max(html.scrollHeight, html.clientHeight, body.scrollHeight, body.clientHeight);
    let x = -scroll.scrollLeft + getWindowScrollBarX(element);
    const y = -scroll.scrollTop;
    if (getComputedStyle(body).direction === "rtl") {
        x += max(html.clientWidth, body.clientWidth) - width;
    }
    return {
        width,
        height,
        x,
        y
    };
}

function getViewportRect(element, strategy) {
    const win = getWindow(element);
    const html = getDocumentElement(element);
    const visualViewport = win.visualViewport;
    let width = html.clientWidth;
    let height = html.clientHeight;
    let x = 0;
    let y = 0;
    if (visualViewport) {
        width = visualViewport.width;
        height = visualViewport.height;
        const visualViewportBased = isWebKit();
        if (!visualViewportBased || visualViewportBased && strategy === "fixed") {
            x = visualViewport.offsetLeft;
            y = visualViewport.offsetTop;
        }
    }
    return {
        width,
        height,
        x,
        y
    };
}

function getInnerBoundingClientRect(element, strategy) {
    const clientRect = getBoundingClientRect(element, true, strategy === "fixed");
    const top = clientRect.top + element.clientTop;
    const left = clientRect.left + element.clientLeft;
    const scale = isHTMLElement(element) ? getScale(element) : createCoords(1);
    const width = element.clientWidth * scale.x;
    const height = element.clientHeight * scale.y;
    const x = left * scale.x;
    const y = top * scale.y;
    return {
        width,
        height,
        x,
        y
    };
}

function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
    let rect;
    if (clippingAncestor === "viewport") {
        rect = getViewportRect(element, strategy);
    } else if (clippingAncestor === "document") {
        rect = getDocumentRect(getDocumentElement(element));
    } else if (isElement(clippingAncestor)) {
        rect = getInnerBoundingClientRect(clippingAncestor, strategy);
    } else {
        const visualOffsets = getVisualOffsets(element);
        rect = {
            ...clippingAncestor,
            x: clippingAncestor.x - visualOffsets.x,
            y: clippingAncestor.y - visualOffsets.y
        };
    }
    return rectToClientRect(rect);
}

function hasFixedPositionAncestor(element, stopNode) {
    const parentNode = getParentNode(element);
    if (parentNode === stopNode || !isElement(parentNode) || isLastTraversableNode(parentNode)) {
        return false;
    }
    return getComputedStyle(parentNode).position === "fixed" || hasFixedPositionAncestor(parentNode, stopNode);
}

function getClippingElementAncestors(element, cache) {
    const cachedResult = cache.get(element);
    if (cachedResult) {
        return cachedResult;
    }
    let result = getOverflowAncestors(element, [], false).filter((el) => isElement(el) && getNodeName(el) !== "body");
    let currentContainingBlockComputedStyle = null;
    const elementIsFixed = getComputedStyle(element).position === "fixed";
    let currentNode = elementIsFixed ? getParentNode(element) : element;
    while (isElement(currentNode) && !isLastTraversableNode(currentNode)) {
        const computedStyle = getComputedStyle(currentNode);
        const currentNodeIsContaining = isContainingBlock(currentNode);
        if (!currentNodeIsContaining && computedStyle.position === "fixed") {
            currentContainingBlockComputedStyle = null;
        }
        const shouldDropCurrentNode = elementIsFixed ? !currentNodeIsContaining && !currentContainingBlockComputedStyle : !currentNodeIsContaining && computedStyle.position === "static" && !!currentContainingBlockComputedStyle && ["absolute", "fixed"].includes(currentContainingBlockComputedStyle.position) || isOverflowElement(currentNode) && !currentNodeIsContaining && hasFixedPositionAncestor(element, currentNode);
        if (shouldDropCurrentNode) {
            result = result.filter((ancestor) => ancestor !== currentNode);
        } else {
            currentContainingBlockComputedStyle = computedStyle;
        }
        currentNode = getParentNode(currentNode);
    }
    cache.set(element, result);
    return result;
}

function getClippingRect(_ref) {
    let {
        element,
        boundary,
        rootBoundary,
        strategy
    } = _ref;
    const elementClippingAncestors = boundary === "clippingAncestors" ? getClippingElementAncestors(element, this._c) : [].concat(boundary);
    const clippingAncestors = [...elementClippingAncestors, rootBoundary];
    const firstClippingAncestor = clippingAncestors[0];
    const clippingRect = clippingAncestors.reduce((accRect, clippingAncestor) => {
        const rect = getClientRectFromClippingAncestor(element, clippingAncestor, strategy);
        accRect.top = max(rect.top, accRect.top);
        accRect.right = min(rect.right, accRect.right);
        accRect.bottom = min(rect.bottom, accRect.bottom);
        accRect.left = max(rect.left, accRect.left);
        return accRect;
    }, getClientRectFromClippingAncestor(element, firstClippingAncestor, strategy));
    return {
        width: clippingRect.right - clippingRect.left,
        height: clippingRect.bottom - clippingRect.top,
        x: clippingRect.left,
        y: clippingRect.top
    };
}

function getDimensions(element) {
    return getCssDimensions(element);
}

function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
    const isOffsetParentAnElement = isHTMLElement(offsetParent);
    const documentElement = getDocumentElement(offsetParent);
    const isFixed = strategy === "fixed";
    const rect = getBoundingClientRect(element, true, isFixed, offsetParent);
    let scroll = {
        scrollLeft: 0,
        scrollTop: 0
    };
    const offsets = createCoords(0);
    if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
        if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
            scroll = getNodeScroll(offsetParent);
        }
        if (isOffsetParentAnElement) {
            const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent);
            offsets.x = offsetRect.x + offsetParent.clientLeft;
            offsets.y = offsetRect.y + offsetParent.clientTop;
        } else if (documentElement) {
            offsets.x = getWindowScrollBarX(documentElement);
        }
    }
    return {
        x: rect.left + scroll.scrollLeft - offsets.x,
        y: rect.top + scroll.scrollTop - offsets.y,
        width: rect.width,
        height: rect.height
    };
}

function getTrueOffsetParent(element, polyfill) {
    if (!isHTMLElement(element) || getComputedStyle(element).position === "fixed") {
        return null;
    }
    if (polyfill) {
        return polyfill(element);
    }
    return element.offsetParent;
}

function getOffsetParent(element, polyfill) {
    const window2 = getWindow(element);
    if (!isHTMLElement(element)) {
        return window2;
    }
    let offsetParent = getTrueOffsetParent(element, polyfill);
    while (offsetParent && isTableElement(offsetParent) && getComputedStyle(offsetParent).position === "static") {
        offsetParent = getTrueOffsetParent(offsetParent, polyfill);
    }
    if (offsetParent && (getNodeName(offsetParent) === "html" || getNodeName(offsetParent) === "body" && getComputedStyle(offsetParent).position === "static" && !isContainingBlock(offsetParent))) {
        return window2;
    }
    return offsetParent || getContainingBlock(element) || window2;
}

const getElementRects = async function (_ref) {
    let {
        reference,
        floating,
        strategy
    } = _ref;
    const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
    const getDimensionsFn = this.getDimensions;
    return {
        reference: getRectRelativeToOffsetParent(reference, await getOffsetParentFn(floating), strategy),
        floating: {
            x: 0,
            y: 0,
            ...await getDimensionsFn(floating)
        }
    };
};

function isRTL(element) {
    return getComputedStyle(element).direction === "rtl";
}

const platform = {
    convertOffsetParentRelativeRectToViewportRelativeRect,
    getDocumentElement,
    getClippingRect,
    getOffsetParent,
    getElementRects,
    getClientRects,
    getDimensions,
    getScale,
    isElement,
    isRTL
};

function observeMove(element, onMove) {
    let io = null;
    let timeoutId;
    const root = getDocumentElement(element);

    function cleanup() {
        clearTimeout(timeoutId);
        io && io.disconnect();
        io = null;
    }

    function refresh(skip, threshold) {
        if (skip === void 0) {
            skip = false;
        }
        if (threshold === void 0) {
            threshold = 1;
        }
        cleanup();
        const {
            left,
            top,
            width,
            height
        } = element.getBoundingClientRect();
        if (!skip) {
            onMove();
        }
        if (!width || !height) {
            return;
        }
        const insetTop = floor(top);
        const insetRight = floor(root.clientWidth - (left + width));
        const insetBottom = floor(root.clientHeight - (top + height));
        const insetLeft = floor(left);
        const rootMargin = -insetTop + "px " + -insetRight + "px " + -insetBottom + "px " + -insetLeft + "px";
        const options = {
            rootMargin,
            threshold: max(0, min(1, threshold)) || 1
        };
        let isFirstUpdate = true;

        function handleObserve(entries) {
            const ratio = entries[0].intersectionRatio;
            if (ratio !== threshold) {
                if (!isFirstUpdate) {
                    return refresh();
                }
                if (!ratio) {
                    timeoutId = setTimeout(() => {
                        refresh(false, 1e-7);
                    }, 100);
                } else {
                    refresh(false, ratio);
                }
            }
            isFirstUpdate = false;
        }

        try {
            io = new IntersectionObserver(handleObserve, {
                ...options,
                // Handle <iframe>s
                root: root.ownerDocument
            });
        } catch (e) {
            io = new IntersectionObserver(handleObserve, options);
        }
        io.observe(element);
    }

    refresh(true);
    return cleanup;
}

function autoUpdate(reference, floating, update, options) {
    if (options === void 0) {
        options = {};
    }
    const {
        ancestorScroll = true,
        ancestorResize = true,
        elementResize = typeof ResizeObserver === "function",
        layoutShift = typeof IntersectionObserver === "function",
        animationFrame = false
    } = options;
    const referenceEl = unwrapElement(reference);
    const ancestors = ancestorScroll || ancestorResize ? [...referenceEl ? getOverflowAncestors(referenceEl) : [], ...getOverflowAncestors(floating)] : [];
    ancestors.forEach((ancestor) => {
        ancestorScroll && ancestor.addEventListener("scroll", update, {
            passive: true
        });
        ancestorResize && ancestor.addEventListener("resize", update);
    });
    const cleanupIo = referenceEl && layoutShift ? observeMove(referenceEl, update) : null;
    let reobserveFrame = -1;
    let resizeObserver = null;
    if (elementResize) {
        resizeObserver = new ResizeObserver((_ref) => {
            let [firstEntry] = _ref;
            if (firstEntry && firstEntry.target === referenceEl && resizeObserver) {
                resizeObserver.unobserve(floating);
                cancelAnimationFrame(reobserveFrame);
                reobserveFrame = requestAnimationFrame(() => {
                    resizeObserver && resizeObserver.observe(floating);
                });
            }
            update();
        });
        if (referenceEl && !animationFrame) {
            resizeObserver.observe(referenceEl);
        }
        resizeObserver.observe(floating);
    }
    let frameId;
    let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null;
    if (animationFrame) {
        frameLoop();
    }

    function frameLoop() {
        const nextRefRect = getBoundingClientRect(reference);
        if (prevRefRect && (nextRefRect.x !== prevRefRect.x || nextRefRect.y !== prevRefRect.y || nextRefRect.width !== prevRefRect.width || nextRefRect.height !== prevRefRect.height)) {
            update();
        }
        prevRefRect = nextRefRect;
        frameId = requestAnimationFrame(frameLoop);
    }

    update();
    return () => {
        ancestors.forEach((ancestor) => {
            ancestorScroll && ancestor.removeEventListener("scroll", update);
            ancestorResize && ancestor.removeEventListener("resize", update);
        });
        cleanupIo && cleanupIo();
        resizeObserver && resizeObserver.disconnect();
        resizeObserver = null;
        if (animationFrame) {
            cancelAnimationFrame(frameId);
        }
    };
}

const computePosition = (reference, floating, options) => {
    const cache = /* @__PURE__ */ new Map();
    const mergedOptions = {
        platform,
        ...options
    };
    const platformWithCache = {
        ...mergedOptions.platform,
        _c: cache
    };
    return computePosition$1(reference, floating, {
        ...mergedOptions,
        platform: platformWithCache
    });
};

function createEventDispatcher() {
    const component = get_current_component();
    return (type, target, detail) => {
        const callbacks = component.$$.callbacks[type];
        if (callbacks) {
            const event = new CustomEvent(type, {detail});
            target.dispatchEvent(event);
            callbacks.slice().forEach((fn) => {
                fn.call(component, event);
            });
        }
    };
}

const Popper = create_ssr_component(($$result, $$props, $$bindings, slots) => {
    let $$restProps = compute_rest_props($$props, [
        "activeContent",
        "arrow",
        "offset",
        "placement",
        "trigger",
        "triggeredBy",
        "reference",
        "strategy",
        "open",
        "yOnly"
    ]);
    let {activeContent = false} = $$props;
    let {arrow = true} = $$props;
    let {offset: offset$1 = 8} = $$props;
    let {placement = "top"} = $$props;
    let {trigger = "hover"} = $$props;
    let {triggeredBy = void 0} = $$props;
    let {reference = void 0} = $$props;
    let {strategy = "absolute"} = $$props;
    let {open = false} = $$props;
    let {yOnly = false} = $$props;
    const dispatch = createEventDispatcher();
    let referenceEl;
    let floatingEl;
    let arrowEl;
    let contentEl;
    const px = (n) => n != null ? `${n}px` : "";
    let arrowSide;
    const oppositeSideMap2 = {
        left: "right",
        right: "left",
        bottom: "top",
        top: "bottom"
    };
    let middleware;

    function updatePosition() {
        computePosition(referenceEl, floatingEl, {placement, strategy, middleware}).then(({
                                                                                              x,
                                                                                              y,
                                                                                              middlewareData,
                                                                                              placement: placement2,
                                                                                              strategy: strategy2
                                                                                          }) => {
            floatingEl.style.position = strategy2;
            floatingEl.style.left = yOnly ? "0" : px(x);
            floatingEl.style.top = px(y);
            if (middlewareData.arrow && arrowEl instanceof HTMLDivElement) {
                arrowEl.style.left = px(middlewareData.arrow.x);
                arrowEl.style.top = px(middlewareData.arrow.y);
                arrowSide = oppositeSideMap2[placement2.split("-")[0]];
                arrowEl.style[arrowSide] = px(-arrowEl.offsetWidth / 2 - ($$props.border ? 1 : 0));
            }
        });
    }

    function init(node, _referenceEl) {
        floatingEl = node;
        let cleanup = autoUpdate(_referenceEl, floatingEl, updatePosition);
        return {
            update(_referenceEl2) {
                cleanup();
                cleanup = autoUpdate(_referenceEl2, floatingEl, updatePosition);
            },
            destroy() {
                cleanup();
            }
        };
    }

    let arrowClass;
    if ($$props.activeContent === void 0 && $$bindings.activeContent && activeContent !== void 0)
        $$bindings.activeContent(activeContent);
    if ($$props.arrow === void 0 && $$bindings.arrow && arrow !== void 0)
        $$bindings.arrow(arrow);
    if ($$props.offset === void 0 && $$bindings.offset && offset$1 !== void 0)
        $$bindings.offset(offset$1);
    if ($$props.placement === void 0 && $$bindings.placement && placement !== void 0)
        $$bindings.placement(placement);
    if ($$props.trigger === void 0 && $$bindings.trigger && trigger !== void 0)
        $$bindings.trigger(trigger);
    if ($$props.triggeredBy === void 0 && $$bindings.triggeredBy && triggeredBy !== void 0)
        $$bindings.triggeredBy(triggeredBy);
    if ($$props.reference === void 0 && $$bindings.reference && reference !== void 0)
        $$bindings.reference(reference);
    if ($$props.strategy === void 0 && $$bindings.strategy && strategy !== void 0)
        $$bindings.strategy(strategy);
    if ($$props.open === void 0 && $$bindings.open && open !== void 0)
        $$bindings.open(open);
    if ($$props.yOnly === void 0 && $$bindings.yOnly && yOnly !== void 0)
        $$bindings.yOnly(yOnly);
    placement && (referenceEl = referenceEl);
    {
        dispatch("show", referenceEl, open);
    }
    middleware = [
        flip(),
        shift(),
        offset(+offset$1),
        arrowEl
    ];
    arrowClass = twJoin("absolute pointer-events-none block w-[10px] h-[10px] rotate-45 bg-inherit border-inherit", $$props.border && arrowSide === "bottom" && "border-b border-r", $$props.border && arrowSide === "top" && "border-t border-l ", $$props.border && arrowSide === "right" && "border-t border-r ", $$props.border && arrowSide === "left" && "border-b border-l ");
    return `${!referenceEl ? `<div${add_attribute("this", contentEl, 0)}></div>` : ``} ${open && referenceEl ? `${validate_component(Frame, "Frame").$$render($$result, Object.assign({}, {use: init}, {options: referenceEl}, {role: "tooltip"}, {tabindex: activeContent ? -1 : void 0}, $$restProps), {}, {
        default: () => {
            return `${slots.default ? slots.default({}) : ``} ${arrow ? `<div${add_attribute("class", arrowClass, 0)}></div>` : ``}`;
        }
    })}` : ``} `;
});
const Dropdown = create_ssr_component(($$result, $$props, $$bindings, slots) => {
    let $$restProps = compute_rest_props($$props, ["activeUrl", "open", "containerClass", "headerClass", "footerClass", "activeClass"]);
    let $$slots = compute_slots(slots);
    const activeUrlStore = writable("");
    let {activeUrl = ""} = $$props;
    let {open = false} = $$props;
    let {containerClass = "divide-y z-50"} = $$props;
    let {headerClass = "py-1 overflow-hidden rounded-t-lg"} = $$props;
    let {footerClass = "py-1 overflow-hidden rounded-b-lg"} = $$props;
    let {activeClass = "text-primary-700 dark:text-primary-700 hover:text-primary-900 dark:hover:text-primary-900"} = $$props;
    let activeCls = twMerge(activeClass, $$props.classActive);
    setContext("DropdownType", {activeClass: activeCls});
    setContext("activeUrl", activeUrlStore);
    let containerCls = twMerge(containerClass, $$props.classContainer);
    let headerCls = twMerge(headerClass, $$props.classHeader);
    let ulCls = twMerge("py-1", $$props.class);
    let footerCls = twMerge(footerClass, $$props.classFooter);
    if ($$props.activeUrl === void 0 && $$bindings.activeUrl && activeUrl !== void 0)
        $$bindings.activeUrl(activeUrl);
    if ($$props.open === void 0 && $$bindings.open && open !== void 0)
        $$bindings.open(open);
    if ($$props.containerClass === void 0 && $$bindings.containerClass && containerClass !== void 0)
        $$bindings.containerClass(containerClass);
    if ($$props.headerClass === void 0 && $$bindings.headerClass && headerClass !== void 0)
        $$bindings.headerClass(headerClass);
    if ($$props.footerClass === void 0 && $$bindings.footerClass && footerClass !== void 0)
        $$bindings.footerClass(footerClass);
    if ($$props.activeClass === void 0 && $$bindings.activeClass && activeClass !== void 0)
        $$bindings.activeClass(activeClass);
    let $$settled;
    let $$rendered;
    let previous_head = $$result.head;
    do {
        $$settled = true;
        $$result.head = previous_head;
        {
            activeUrlStore.set(activeUrl);
        }
        {
            {
                $$restProps.arrow = $$restProps.arrow ?? false;
                $$restProps.trigger = $$restProps.trigger ?? "click";
                $$restProps.placement = $$restProps.placement ?? "bottom";
                $$restProps.color = $$restProps.color ?? "dropdown";
                $$restProps.shadow = $$restProps.shadow ?? true;
                $$restProps.rounded = $$restProps.rounded ?? true;
            }
        }
        $$rendered = `${validate_component(Popper, "Popper").$$render(
            $$result,
            Object.assign({}, {activeContent: true}, $$restProps, {class: containerCls}, {open}),
            {
                open: ($$value) => {
                    open = $$value;
                    $$settled = false;
                }
            },
            {
                default: () => {
                    return `${$$slots.header ? `<div${add_attribute("class", headerCls, 0)}>${slots.header ? slots.header({}) : ``}</div>` : ``} <ul${add_attribute("class", ulCls, 0)}>${slots.default ? slots.default({}) : ``}</ul> ${$$slots.footer ? `<div${add_attribute("class", footerCls, 0)}>${slots.footer ? slots.footer({}) : ``}</div>` : ``}`;
                }
            }
        )} `;
    } while (!$$settled);
    return $$rendered;
});
const Wrapper = create_ssr_component(($$result, $$props, $$bindings, slots) => {
    let $$restProps = compute_rest_props($$props, ["tag", "show", "use"]);
    let {tag = "div"} = $$props;
    let {show} = $$props;
    let {
        use = () => {
        }
    } = $$props;
    if ($$props.tag === void 0 && $$bindings.tag && tag !== void 0)
        $$bindings.tag(tag);
    if ($$props.show === void 0 && $$bindings.show && show !== void 0)
        $$bindings.show(show);
    if ($$props.use === void 0 && $$bindings.use && use !== void 0)
        $$bindings.use(use);
    return `${show ? `${((tag$1) => {
        return tag$1 ? `<${tag}${spread([escape_object($$restProps)], {})}>${is_void(tag$1) ? "" : `${slots.default ? slots.default({}) : ``}`}${is_void(tag$1) ? "" : `</${tag$1}>`}` : "";
    })(tag)}` : `${slots.default ? slots.default({}) : ``}`} `;
});
const DropdownItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
    let active;
    let liClass;
    let $$restProps = compute_rest_props($$props, ["defaultClass", "href", "activeClass"]);
    let {defaultClass = "font-medium py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600"} = $$props;
    let {href = void 0} = $$props;
    let {activeClass = void 0} = $$props;
    const context = getContext("DropdownType") ?? {};
    const activeUrlStore = getContext("activeUrl");
    let sidebarUrl = "";
    activeUrlStore.subscribe((value) => {
        sidebarUrl = value;
    });
    let wrap = true;

    function init(node) {
        wrap = node.parentElement?.tagName === "UL";
    }

    if ($$props.defaultClass === void 0 && $$bindings.defaultClass && defaultClass !== void 0)
        $$bindings.defaultClass(defaultClass);
    if ($$props.href === void 0 && $$bindings.href && href !== void 0)
        $$bindings.href(href);
    if ($$props.activeClass === void 0 && $$bindings.activeClass && activeClass !== void 0)
        $$bindings.activeClass(activeClass);
    active = sidebarUrl ? href === sidebarUrl : false;
    liClass = twMerge(defaultClass, href ? "block" : "w-full text-left", active && (activeClass ?? context.activeClass), $$props.class);
    return `${validate_component(Wrapper, "Wrapper").$$render($$result, {tag: "li", show: wrap, use: init}, {}, {
        default: () => {
            return `${((tag) => {
                return tag ? `<${href ? "a" : "button"}${spread(
                    [
                        {href: escape_attribute_value(href)},
                        {
                            type: escape_attribute_value(href ? void 0 : "button")
                        },
                        {
                            role: escape_attribute_value(href ? "link" : "button")
                        },
                        escape_object($$restProps),
                        {class: escape_attribute_value(liClass)}
                    ],
                    {}
                )}>${is_void(tag) ? "" : `${slots.default ? slots.default({}) : ``}`}${is_void(tag) ? "" : `</${tag}>`}` : "";
            })(href ? "a" : "button")}`;
        }
    })} `;
});
const ChevronDownSolid = create_ssr_component(($$result, $$props, $$bindings, slots) => {
    let $$restProps = compute_rest_props($$props, ["size", "role", "ariaLabel"]);
    const ctx = getContext("iconCtx") ?? {};
    const sizes = {
        xs: "w-3 h-3",
        sm: "w-4 h-4",
        md: "w-5 h-5",
        lg: "w-6 h-6",
        xl: "w-8 h-8"
    };
    let {size = ctx.size || "md"} = $$props;
    let {role = ctx.role || "img"} = $$props;
    let {ariaLabel = "chevron down solid"} = $$props;
    if ($$props.size === void 0 && $$bindings.size && size !== void 0)
        $$bindings.size(size);
    if ($$props.role === void 0 && $$bindings.role && role !== void 0)
        $$bindings.role(role);
    if ($$props.ariaLabel === void 0 && $$bindings.ariaLabel && ariaLabel !== void 0)
        $$bindings.ariaLabel(ariaLabel);
    return `<svg${spread(
        [
            {xmlns: "http://www.w3.org/2000/svg"},
            {fill: "currentColor"},
            escape_object($$restProps),
            {
                class: escape_attribute_value(twMerge("shrink-0", sizes[size], $$props.class))
            },
            {role: escape_attribute_value(role)},
            {
                "aria-label": escape_attribute_value(ariaLabel)
            },
            {viewBox: "0 0 10 6"}
        ],
        {}
    )}><path fill="currentColor" d="M5.012 6a1 1 0 0 1-.707-.292l-4-3.992A.998.998 0 0 1 1.395.08a1 1 0 0 1 .324.224L5.012 3.59 8.305.305A1.001 1.001 0 0 1 10 1.014a.997.997 0 0 1-.28.702l-4 3.992A1.001 1.001 0 0 1 5.011 6Z"></path></svg> `;
});
const ChevronLeftSolid = create_ssr_component(($$result, $$props, $$bindings, slots) => {
    let $$restProps = compute_rest_props($$props, ["size", "role", "ariaLabel"]);
    const ctx = getContext("iconCtx") ?? {};
    const sizes = {
        xs: "w-3 h-3",
        sm: "w-4 h-4",
        md: "w-5 h-5",
        lg: "w-6 h-6",
        xl: "w-8 h-8"
    };
    let {size = ctx.size || "md"} = $$props;
    let {role = ctx.role || "img"} = $$props;
    let {ariaLabel = "chevron left solid"} = $$props;
    if ($$props.size === void 0 && $$bindings.size && size !== void 0)
        $$bindings.size(size);
    if ($$props.role === void 0 && $$bindings.role && role !== void 0)
        $$bindings.role(role);
    if ($$props.ariaLabel === void 0 && $$bindings.ariaLabel && ariaLabel !== void 0)
        $$bindings.ariaLabel(ariaLabel);
    return `<svg${spread(
        [
            {xmlns: "http://www.w3.org/2000/svg"},
            {fill: "currentColor"},
            escape_object($$restProps),
            {
                class: escape_attribute_value(twMerge("shrink-0", sizes[size], $$props.class))
            },
            {role: escape_attribute_value(role)},
            {
                "aria-label": escape_attribute_value(ariaLabel)
            },
            {viewBox: "0 0 6 10"}
        ],
        {}
    )}><path fill="currentColor" d="M4.99 10a.998.998 0 0 1-.706-.293L.292 5.712a1 1 0 0 1 0-1.412L4.284.305a.998.998 0 1 1 1.411 1.412L2.41 5.007l3.286 3.288A.999.999 0 0 1 4.99 10Z"></path></svg> `;
});
const LangSelector_svelte_svelte_type_style_lang = "";
const css$2 = {
    code: ".locale-selector.svelte-15xbm1n{display:flex;flex-direction:row}",
    map: null
};
const LangSelector = create_ssr_component(($$result, $$props, $$bindings, slots) => {
    let value = fallbackLocale;
    let current = "";
    let dropdownOpen = false;

    function localeChange() {
        dropdownOpen = false;
        for (let i = 0; i < languageOptions.length; i++) {
            if (languageOptions[i].code === value) {
                current = languageOptions[i].flag + " " + languageOptions[i].name;
                break;
            }
        }
    }

    $$result.css.add(css$2);
    let $$settled;
    let $$rendered;
    let previous_head = $$result.head;
    do {
        $$settled = true;
        $$result.head = previous_head;
        {
            $locale.subscribe((val) => {
                value = val;
                if (value === void 0) {
                    value = fallbackLocale;
                }
                localeChange();
            });
        }
        $$rendered = `<div class="locale-selector flex bg-gray-800 p-4 rounded svelte-15xbm1n">${validate_component(Button, "Button").$$render(
            $$result,
            {
                class: "flex flex-row justify-items-center text-xl"
            },
            {},
            {
                default: () => {
                    return `${escape(current)} ${dropdownOpen ? `${validate_component(ChevronDownSolid, "ChevronDownSolid").$$render($$result, {class: "w-3 h-3 ml-2 dark:text-white"}, {}, {})}` : ``} ${!dropdownOpen ? `${validate_component(ChevronLeftSolid, "ChevronLeftSolid").$$render(
                        $$result,
                        {
                            class: "w-3 h-3 ml-2 text-white dark:text-white"
                        },
                        {},
                        {}
                    )}` : ``}`;
                }
            }
        )} ${validate_component(Dropdown, "Dropdown").$$render(
            $$result,
            {
                class: "justify-center bg-blue-950 flex flex-col items-center rounded mt-2.5",
                open: dropdownOpen
            },
            {
                open: ($$value) => {
                    dropdownOpen = $$value;
                    $$settled = false;
                }
            },
            {
                default: () => {
                    return `${each(languageOptions, (option) => {
                        return `${validate_component(DropdownItem, "DropdownItem").$$render(
                            $$result,
                            {
                                class: "p-3 text-white dark:text-white hover:bg-blue-900 w-40 rounded"
                            },
                            {},
                            {
                                default: () => {
                                    return `${escape(option.flag + " " + option.name)} `;
                                }
                            }
                        )}`;
                    })}`;
                }
            }
        )}</div>`;
    } while (!$$settled);
    return $$rendered;
});
const NavigationBar_svelte_svelte_type_style_lang = "";
const css$1 = {
    code: "@media screen and (max-width: 980px){nav.svelte-1ldbeyc{flex-direction:column;align-items:flex-start;height:auto}#items.svelte-1ldbeyc{height:auto;flex-direction:column;gap:20px;font-size-adjust:0.7}}",
    map: null
};
const NavigationBar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
    let $_, $$unsubscribe__;
    $$unsubscribe__ = subscribe($format, (value) => $_ = value);
    let {currentPage = "home"} = $$props;
    const endPoints = {
        "home": "/",
        "dev": "/",
        "sa": "/",
        "about": "/",
        "contact": "/"
    };
    if ($$props.currentPage === void 0 && $$bindings.currentPage && currentPage !== void 0)
        $$bindings.currentPage(currentPage);
    $$result.css.add(css$1);
    $$unsubscribe__();
    return `<nav class="flex items-center h-16 w-screen border-0 bg-transparent mt-4 mb-10 svelte-1ldbeyc"><div class="flex flex-row items-center justify-evenly w-screen h-16 svelte-1ldbeyc" id="items"><a class="text-white hover:text-gray-300 flex flex-row items-center gap-3" href="https://farmeurimmo.fr"><div class="w-16 h-16">${validate_component(Image_1, "Image").$$render(
        $$result,
        {
            className: "rounded-full border-0",
            src: "https://cdn.farmeurimmo.fr/img/logo.jpg"
        },
        {},
        {}
    )}</div>
            Farmeurimmo</a> ${each(Object.entries(endPoints), ([key, value]) => {
        return `${key === currentPage ? `<a class="text-blue-700 font-bold hover:text-gray-300"${add_attribute("href", value, 0)}>${escape($_("nav." + key))}</a>` : `<a class="text-white hover:text-gray-300"${add_attribute("href", value, 0)}>${escape($_("nav." + key))}</a>`}`;
    })} ${validate_component(LangSelector, "LangSelector").$$render($$result, {}, {}, {})}</div> </nav>`;
});
const _page_svelte_svelte_type_style_lang = "";
const css = {
    code: "@media screen and (max-width: 780px){#presentations.svelte-ucb3eh{flex-direction:column}}@keyframes svelte-ucb3eh-typing_cursor{0%{border-right:0.15em solid #fff}50%{border-right:0.15em solid transparent}100%{border-right:0.15em solid #fff}}#iam.svelte-ucb3eh{animation:svelte-ucb3eh-typing_cursor 1s steps(10) infinite}#card.svelte-ucb3eh:hover{transform:scale(1.05)}#card.svelte-ucb3eh{transition:all 0.2s ease-in-out}",
    map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
    let $_, $$unsubscribe__;
    $$unsubscribe__ = subscribe($format, (value) => $_ = value);
    let presentations = [
        {
            title: "pages.home.presentations.dev",
            imageUrl: "https://cdn.farmeurimmo.fr/img/wallpaper-dev-hm.png"
        },
        {
            title: "pages.home.presentations.sysadmin",
            imageUrl: "https://cdn.farmeurimmo.fr/img/wallpaper-sa-hm.png"
        }
    ];
    let typingText = "";
    defineRoles();

    function defineRoles() {
        return [
            $_("pages.home.iam.hello"),
            $_("pages.home.iam.iam"),
            $_("pages.home.iam.dev"),
            $_("pages.home.iam.sysadmin")
        ];
    }

    $$result.css.add(css);
    {
        {
            $_("language");
        }
    }
    $$unsubscribe__();
    return `<title>${escape($_("pages.home.title"))}</title> ${validate_component(NavigationBar, "NavigationBar").$$render($$result, {}, {}, {})} <body class="flex flex-col h-screen"><section class="justify-center items-center flex flex-col"><h1 class="text-4xl h-12 svelte-ucb3eh" id="iam"><!-- HTML_TAG_START -->${typingText}<!-- HTML_TAG_END --></h1> <div class="flex flex-row mt-20 justify-evenly gap-20 m-20 svelte-ucb3eh" id="presentations">${each(presentations, (presentation, index) => {
        return `<div class="flex flex-col justify-center items-center bg-gray-800 rounded-t-3xl svelte-ucb3eh" id="card"><h2 class="text-2xl p-5">${escape($_(presentation.title))}</h2> ${validate_component(Image_1, "Image").$$render(
            $$result,
            {
                src: presentation.imageUrl,
                className: "border-0 w-screen h-auto"
            },
            {},
            {}
        )} </div>`;
    })}</div></section> ${validate_component(CommonFooter, "CommonFooter").$$render($$result, {}, {}, {})} </body>`;
});
export {
    Page as default
};
