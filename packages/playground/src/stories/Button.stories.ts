import { clearAllMocks, expect, fn, userEvent, within } from '@storybook/test'
import type { ArgTypes, Meta, StoryObj } from '@storybook/vue3'
import { set } from 'lodash-es'
import { SeButton, SeButtonGroup } from 'seam-element'

type Story = StoryObj<typeof SeButton> & { argTypes?: ArgTypes }

const meta: Meta<typeof SeButton> = {
  title: 'Example/Button',
  component: SeButton,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['primary', 'success', 'warning', 'danger', 'info', ''],
    },
    size: {
      control: { type: 'select' },
      options: ['large', 'default', 'small', ''],
    },
    disabled: {
      control: 'boolean',
    },
    loading: {
      control: 'boolean',
    },
    useThrottle: {
      control: 'boolean',
    },
    throttleDuration: {
      control: 'number',
    },
    autofocus: {
      control: 'boolean',
    },
    tag: {
      control: { type: 'select' },
      options: ['button', 'a', 'div'],
    },
    nativeType: {
      control: { type: 'select' },
      options: ['button', 'submit', 'reset', ''],
    },
    icon: {
      control: { type: 'text' },
    },
    loadingIcon: {
      control: { type: 'text' },
    },
  },
  args: { onClick: fn() },
}

const container = (val: string) => `
  <div style="margin:5px">
    ${val}
  </div>
`

type ButtonStoryType = Story & {
  args: {
    content: string
  }
}

export const Default: ButtonStoryType = {
  argTypes: {
    content: {
      control: { type: 'text' },
    },
  },
  args: {
    type: 'primary',
    content: 'Button',
  },

  render: (args) => ({
    components: { SeButton },
    setup() {
      return { args }
    },
    template: container(
      `<se-button data-testid="story-test-btn" v-bind="args">{{args.content}}</se-button>`
    ),
  }),
  play: async ({ canvasElement, args, step }) => {
    const canvas = within(canvasElement)
    const btn = canvas.getByTestId('story-test-btn')

    await step(
      'When useThrottle is set to true, the onClick should be called once',
      async () => {
        set(args, 'useThrottle', true)
        await userEvent.tripleClick(btn)

        expect(args.onClick).toHaveBeenCalledOnce()
        clearAllMocks()
      }
    )

    await step(
      'When useThrottle is set to false, the onClick should be called three times',
      async () => {
        set(args, 'useThrottle', false)
        await userEvent.tripleClick(btn)

        expect(args.onClick).toHaveBeenCalledTimes(3)
        clearAllMocks()
      }
    )

    await step(
      'When disabled is set to true, the onClick should not be called',
      async () => {
        set(args, 'disabled', true)
        await userEvent.click(btn)

        expect(args.onClick).not.toHaveBeenCalled()
        set(args, 'disabled', false)
        clearAllMocks()
      }
    )

    await step(
      'When loading is set to true, the onClick should not be called',
      async () => {
        set(args, 'loading', true)
        await userEvent.click(btn)

        expect(args.onClick).not.toHaveBeenCalled()
        set(args, 'loading', false)
        clearAllMocks()
      }
    )
  },
}

export const Autofocus: ButtonStoryType = {
  argTypes: {
    content: {
      control: { type: 'text' },
    },
  },
  args: {
    content: 'Button',
    autofocus: true,
  },
  render: (args) => ({
    components: { SeButton },
    setup() {
      return { args }
    },
    template: container(
      `
      <p>请点击浏览器的刷新页面来获取按钮聚焦</p>
      <se-button data-testid="story-test-btn" v-bind="args">{{args.content}}</se-button>
      `
    ),
  }),
  play: async ({ args }) => {
    await userEvent.keyboard('{enter}')

    expect(args.onClick).toHaveBeenCalledOnce()
    clearAllMocks()
  },
}

export const Circle: Story = {
  args: {
    icon: 'search',
  },
  // @ts-ignore
  render: (args) => ({
    components: { SeButton },
    setup() {
      return { args }
    },
    template: container(`<se-button circle v-bind="args" />`),
  }),
  // @ts-ignore
  play: async ({ canvasElement, args, step }) => {
    const canvas = within(canvasElement)

    await step('click button', async () => {
      await userEvent.click(canvas.getByRole('button'))
      expect(args.onClick).toHaveBeenCalled()
      clearAllMocks()
    })
  },
}
Circle.parameters = {}

export const Group: Story & { args: { content1: string; content2: string } } = {
  argTypes: {
    groupType: {
      control: { type: 'select' },
      options: ['primary', 'success', 'warning', 'danger', 'info', ''],
    },
    groupSize: {
      control: { type: 'select' },
      options: ['large', 'default', 'small', ''],
    },
    groupDisabled: {
      control: 'boolean',
    },
    content1: {
      control: { type: 'text' },
      defaultValue: 'Button1',
    },
    content2: {
      control: { type: 'text' },
      defaultValue: 'Button2',
    },
  },
  args: {
    round: true,
    content1: 'Button1',
    content2: 'Button2',
  },
  render: (args) => ({
    components: { SeButton, SeButtonGroup },
    setup() {
      return { args }
    },
    template: container(`
       <se-button-group :type="args.groupType" :size="args.groupSize" :disabled="args.groupDisabled">
         <se-button v-bind="args">{{args.content1}}</se-button>
         <se-button v-bind="args">{{args.content2}}</se-button>
       </se-button-group>
    `),
  }),
  play: async ({ canvasElement, args, step }) => {
    const canvas = within(canvasElement)
    await step('click btn1', async () => {
      await userEvent.click(canvas.getByText('Button1'))
    })

    await step('click btn2', async () => {
      await userEvent.click(canvas.getByText('Button2'))
    })
    expect(args.onClick).toHaveBeenCalled()
  },
}

export default meta
