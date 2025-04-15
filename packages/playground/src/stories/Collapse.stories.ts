import type { Meta, StoryObj } from '@storybook/vue3'
import { SeCollapse, SeCollapseItem } from 'seam-element'
type Story = StoryObj<typeof SeCollapse>

const meta: Meta<typeof SeCollapse> = {
  title: 'Example/Collapse',
  component: SeCollapse,
  subcomponents: { SeCollapseItem },
  tags: ['autodocs'],
}

export const Default: Story = {
  args: {
    accordion: true,
    modelValue: ['a'],
  },
  render: (args) => ({
    components: {
      SeCollapse,
      SeCollapseItem,
    },
    setup() {
      return {
        args,
      }
    },
    template: `    
    <se-collapse v-bind="args">
      <se-collapse-item name="a" title="Title a">
        <div>this is content a</div>
      </se-collapse-item>
      <se-collapse-item name="b" title="title b">
        <div>this is content b</div>
      </se-collapse-item>
      <se-collapse-item name="c" title="title c  disable" disabled>
        <div>this is content c</div>
      </se-collapse-item>
    </se-collapse>
    `,
  }),
}

export default meta
