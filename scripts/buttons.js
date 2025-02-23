import _ from 'lodash';
// import Color from 'color';
import Color from 'colorjs.io';


/* Creates default button */
const createDefault = options => {

    return {
        [`${options.baseClass}`]: {
            borderRadius: options.borderRadius,
            cursor: options.cursor,
            display: 'inline-block',
            fontSize: options.fontSize,
            fontWeight: options.fontWeight,
            lineHeight: options.lineHeight,
            padding: options.padding,
            textDecoration: 'none',
            transition: options.transition
        } 
    }
}

/* Creates solid colored buttons */
const createSolid = (colorConfig, options) => {

    if (_.isEmpty(colorConfig)) return {};

    let buttonStyles = {};

    _.forIn(Object.entries(colorConfig), config => {

        let [key, properties] = config;

        Object.assign(buttonStyles, {
            [`${options.baseClass}-${key}`]: {
                backgroundColor: properties['background'],
                color: properties['text'],
                cursor: _.get(properties, 'cursor', options.cursor),
                opacity: _.get(properties, 'opacity', '1'),
                pointerEvents: _.get(properties, 'pointerEvents', 'auto'),
                '&:hover': {
                    backgroundColor: _.get(properties, 'hoverBackground', new Color(properties.background || "rgb(0,0,0,1)").darken(0.1).toString({format: "hex"})),
                    color: _.get(properties, 'hoverText', properties.text)
                },
                '&:active': {
                    backgroundColor: _.get(properties, 'activeBackground', new Color (properties.background || "rgb(0,0,0,1)").darken(0.1).toString({format: "hex"})),
                    color: _.get(properties, 'activeText', properties.text)
                }
            }
        });
    });
    
    return buttonStyles;
}

/* Creates outlined buttons */
const createOutlined = (colorConfig, options) => {

    if (_.isEmpty(colorConfig)) return {};

    let buttonStyles = {};

    _.forIn(Object.entries(colorConfig), config => {

        let [key, properties] = config;

        let textColor = (key === 'default' || key === 'disabled') ? `${properties.text}` : `${properties.background}`;

        let buttonProperties = {
            backgroundColor: 'transparent',
            border: `solid ${options.borderWidth}px ${properties.background}`,
            color: textColor,
            cursor: _.get(properties, 'cursor', options.cursor),
            opacity: _.get(properties, 'opacity', '1'),
            pointerEvents: _.get(properties, 'pointerEvents', 'auto'),
        };

        Object.assign(buttonStyles, {
            [`${options.baseClass}-outlined-${key}`]: {
                ...buttonProperties,
                '&:hover': {
                    borderColor: _.get(properties, 'hoverBorderColor', new Color (properties.background || "rgb(0,0,0,1)").darken(0.2).toString({format: "hex"})),
                    borderWidth: _.get(properties, 'hoverBorderWidth', options.borderWidth),
                    color: _.get(properties, 'hoverText', textColor)
                },
                '&:active': {
                    borderColor: _.get(properties, 'activeBorderColor', new Color (properties.background || "rgb(0,0,0,1)").darken(0.2).toString({format: "hex"})),
                    borderWidth: _.get(properties, 'activeBorderWidth', options.borderWidth),
                    color: _.get(properties, 'activeText', textColor)
                }
            }
        },
        {
            [`${options.baseClass}-outlined-alt-${key}`]: {
                ...buttonProperties,
                '&:hover': {
                    backgroundColor: _.get(properties, 'hoverBackground', properties.background),
                    color: _.get(properties, 'hoverText', '#fff')
                },
                '&:active': {
                    borderColor: _.get(properties, 'hoverBorderColor', properties.background),
                    color: _.get(properties, 'activeText', '#fff')
                }
            }
        });
    });

    return buttonStyles;
}

/* Creates rounded buttons */
function createRounded(options) {
    return {
        [`${options.baseClass}-rounded`] : {
            borderRadius: '25px'
        },
    }
}

/* Creates gradient buttons */
function createGradient(colorConfig, options) {

    if (_.isEmpty(colorConfig)) return {};

    let buttonStyles = {};

    _.forIn(Object.entries(colorConfig), config => {

        let [key, properties] = config;

        let dark = new Color (properties.background || "rgb(0,0,0,1)").darken(0.2).toString({format: "hex"});

        let light = new Color (properties.background || "rgb(0,0,0,1)").lighten(0.1).toString({format: "hex"});

        Object.assign(buttonStyles, {
            [`${options.baseClass}-gradient-${key}`]: {
                backgroundImage: `linear-gradient(to right, ${dark} 0%, ${light} 51%, ${dark} 100%)`,
                backgroundSize: '200% auto',
                color: '#fff',
                '&:hover': {
                    backgroundPosition: 'right center'
                }
            }
        });
    });
    
    return buttonStyles;
}

/* Creates button sizes */
function createSizes(options) {

    let buttonSizes = {};

    Object.entries(options.sizes).forEach(size => {

        let [key, properties] = size;

        Object.assign(buttonSizes, {
            [`${options.baseClass}-${key}`]: {
                fontSize: properties.fontSize,
                padding: properties.padding
            }
        })
    });

    return buttonSizes;
}

/* Export all functions as named exports */
export {
    createDefault,
    createSolid,
    createOutlined,
    createRounded,
    createGradient,
    createSizes
}