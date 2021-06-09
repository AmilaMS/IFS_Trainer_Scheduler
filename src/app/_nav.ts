import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: 'dashboard',

  },
  {
    title: true,
    name: 'TRAINING SESSIONS'
  },
  {
    name: 'Create Session',
    url: 'create-training-session',
    icon: 'icon-pencil'
  },
  {
    name: 'Session List',
    url: 'training-session-list',
    icon: 'icon-list'
  },
  {
    title: true,
    name: 'TRAINERS'
  },
  {
    name: 'Add Trainer',
    url: 'add-trainer',
    icon: 'icon-pencil'
  },
  {
    name: 'Trainer List',
    url: 'trainer-list',
    icon: 'icon-list'
  },
  {
    title: true,
    name: 'VIRTUAL MACHINES'
  },
  {
    name: 'Add Virtual Machine',
    url: 'add-virtual-machine',
    icon: 'icon-pencil'
  },
  {
    name: 'Virtual Machine List',
    url: 'virtual-machine-list',
    icon: 'icon-list'
  },
  {
    title: true,
    name: 'LEAVE DETAILS'
  },
  {
    name: 'Leave Requests',
    url: 'leave-request',
    icon: 'icon-list'
  },
  {
    name: 'Trainer Availability',
    url: 'trainer-availability',
    icon: 'icon-check'
  },
  {
    title: true,
    name: 'More'
  },
  {
    name: 'Add More',
    url: '/base',
    icon: 'icon-plus',
    children: [
      {
        name: 'Coordinator',
        url: 'add-coordinator',
        icon: 'icon-user'
      },
      {
        name: 'Location',
        url: 'add-location',
        icon: 'icon-globe'
      },
      {
        name: 'Training Room',
        url: 'add-training-room',
        icon: 'icon-pencil'
      }
    ]
  }

 
 
];
