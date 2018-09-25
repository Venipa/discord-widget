# Discord  Widget

[![pipeline status](https://gitlab.com/Venipa/discord-widget/badges/master/pipeline.svg)](https://gitlab.com/Venipa/discord-widget/commits/master)

![](https://i.mavis.moe/f/vOfYdHWT7E/nhklvwcxuyb243gif.gif)

### Usage

```html
<div data-discordId="discord-guild-id"></div>

<!-- Include the actual Script -->
<script src="./dist/app.js"></script>
<!-- Initiating Script with the selected data attribute -->
<script>
    $(document).ready(function () {
        $('[data-discordId]').DiscordMidget();
    });
</script>
```

### Default Properties/Options

```
elements: $(this)
Width: "100%"
minWidth: ""
minHeight: "600px"
maxWidth: "100%"
maxHeight: "100px"
extraClasses: ""
```

### License

```
MIT License

Discord Midget Author Thiago Cosmovici
Copyright (c) 2018 Discord Midget

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

### Projects used

- [Tippy](https://atomiks.github.io/tippyjs/)

### Socials

- [Instagram](https://www.instagram.com/venipaa/)
- [Email - admin@venipa.net](mailto:admin@venipa.net)
- Discord: Cascade#0001
