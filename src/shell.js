import _styles from './main.css?raw';

export function makeCSS() {
  // We don't want the styled output CSS to contain different color variations for
  // dark and light themes since they are only supported by the editor. Therefore,
  // we will always fall back to the light theme colors here.
  const styles = _styles
    .replace(/light-dark\((#[\da-f]+),\s*(#[\da-f]+)\)/ig, '$1');

  return `
<style>
  * {
    font-family: "Segoe UI", Roboto, Helvetica, sans-serif;
    line-height: 1.55rem;
  }
    
  html,
  body {
    max-width: 1024px;
    padding: 16px;
    margin: auto;
  }
  
  ${styles}
</style>`.trim();
}

export function makeHTML({ body, styled }) {
  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Markutta | Output</title>
    ${styled ? makeCSS() : ''}
  </head>
  <body>
    ${body}
  </body>
</html>`.trim();
}
