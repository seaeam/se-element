import { fn } from '@storybook/test'
import type { ArgTypes, Meta, StoryObj } from '@storybook/vue3'
import { SeAlert, type AlertInstance } from 'seam-element'
import 'seam-element/dist/theme/Alert.css'
import { ref, watch } from 'vue'

type Story = StoryObj<typeof SeAlert> & { argTypes?: ArgTypes }

const meta: Meta<typeof SeAlert> = {
  title: 'Example/Alert',
  component: SeAlert,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['success', 'warning', 'info', 'danger'],
    },
    effect: {
      control: 'select',
      options: ['light', 'dark'],
    },
    center: {
      control: 'boolean',
    },
  },
  args: {
    onClose: fn(),
  },
}

export const Default: Story & { args: { visible: boolean } } = {
  args: {
    title: '标题',
    description: '这是一段描述',
    type: 'success',
    effect: 'light',
    closable: true,
    showIcon: true,
    visible: true,
  },
  render: (args) => ({
    components: { SeAlert },
    setup() {
      const alertRef = ref<AlertInstance>()
      watch(
        () => (args as any).visible,
        (val: boolean) => {
          if (val) {
            alertRef.value?.open()
          } else {
            alertRef.value?.close()
          }
        }
      )
      return { args, alertRef }
    },
    template: `
     <se-alert ref="alertRef" v-bind="args"></se-alert>
    `,
  }),
}

export default meta
