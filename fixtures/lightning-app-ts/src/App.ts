/*
 * If not stated otherwise in this file or this component's LICENSE file the
 * following copyright and licenses apply:
 *
 * Copyright 2022 Metrological
 *
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { Lightning, Utils } from '@lightningjs/sdk';

interface AppTemplateSpec extends Lightning.Component.TemplateSpecStrong {
  Background: {
    Logo: {},
    Text: {},
  }
}

export class App
  extends Lightning.Component<AppTemplateSpec>
  implements Lightning.Component.ImplementTemplateSpec<AppTemplateSpec> {

  readonly Background = this.getByRef('Background')!;
  readonly Logo = this.Background.getByRef('Logo')!;
  readonly Text = this.Background.getByRef('Text')!;

  static _template(): Lightning.Component.Template<AppTemplateSpec> {
    return {
      w: 1920,
      h: 1080,
      Background: {
        w: 1920,
        h: 1080,
        color: 0xfffbb03b,
        src: Utils.asset('images/background.png'),
        Logo: {
          mountX: 0.5,
          mountY: 1,
          x: 960,
          y: 600,
          colorizeResultTexture: true,
          src: Utils.asset('images/logo.png'),
        },
        Text: {
          mount: 0.5,
          x: 960,
          y: 720,
          text: {
            text: "Let's start Building!",
            fontFace: 'Regular',
            fontSize: 64,
            textColor: 0xbbffffff,
          },
        },
      },
    }
  }

  static getFonts() {
    return [{ family: 'Regular', url: Utils.asset('fonts/Roboto-Regular.ttf') as string }]
  }

  override _handleEnter() {
    this.Logo.setSmooth('scale', 1.5, {
      duration: 3
    });
    this.Text.setSmooth('y', 750, {
      duration: 3
    });
  }

  _init() {
    this.Background
      .animation({
        duration: 15,
        repeat: -1,
        delay: 1,
        actions: [
          {
            p: 'color',
            v: { 0: { v: 0xfffbb03b }, 0.5: { v: 0xfff46730 }, 0.8: { v: 0xfffbb03b } },
          },
        ],
      })
      .start();
  }
}
