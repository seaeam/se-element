import { expect, fn, userEvent, within } from '@storybook/test'
import type { ArgTypes, Meta, StoryObj } from '@storybook/vue3'
import { ErButton } from 'toy-element'

type Story = StoryObj<typeof ErButton> & { argTypes?: ArgTypes }

const meta: Meta<typeof ErButton> = {
  title: 'Example/Button',
  component: ErButton,
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

export const Default: Story & { args: { content: string } } = {
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
    components: { ErButton },
    setup() {
      return { args }
    },
    template: container(
      `<er-button v-bind="args">{{args.content}}</er-button>`
    ),
  }),
  play: async ({ canvasElement, args, step }) => {
    const canvas = within(canvasElement)
    await step('click button', async () => {
      await userEvent.tripleClick(canvas.getByRole('button'))
    })

    expect(args.onClick).toHaveBeenCalled()
  },
}

export default meta
