import { trigger, animate, style, group, query, transition } from '@angular/animations';

export const routerTransition = trigger('routerTransition', [
  transition('* <=> *', [
    query(':enter, :leave', style({ position: 'fixed', width:'100%', zIndex: '999', background: "#fff" })
      , { optional: true }),
    group([
        query(':enter', [
            style({ transform: 'translateX(100%)' }),
            animate('.3s ease-in-out', style({ transform: 'translateX(0%)' }))
          ], { optional: true }),
        query(':leave', [
            style({ transform: 'translateX(0%)' }),
            animate('.3s ease-in-out', style({ transform: 'translateX(-100%)' }))
        ], { optional: true }),
    ])
  ])
])

// import {sequence, trigger, stagger, animate, style, group, query as q, transition, keyframes, animateChild} from '@angular/animations';
// const query = (s,a,o={optional:true})=>q(s,a,o);

// export const routerTransition = trigger('routerTransition', [
//   transition('* => *', [
//     query(':enter, :leave', style({ position: 'fixed', width:'100%', background: "#fff"})),
//     query(':enter', style({ transform: 'translateX(100%)' })),
//     sequence([
//       query(':leave', animateChild()), 
//       group([
//         query(':leave', [
//           style({ transform: 'translateX(0%)' }),
//           animate('500ms cubic-bezier(.75,-0.48,.26,1.52)', 
//             style({ transform: 'translateX(-100%)' }))
//         ]),
//         query(':enter', [
//           style({ transform: 'translateX(100%)' }),
//           animate('500ms cubic-bezier(.75,-0.48,.26,1.52)', 
//             style({ transform: 'translateX(0%)' })),
//         ]),
//       ]),
//       query(':enter', animateChild()),
//     ])
//   ])
// ]);