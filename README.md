###### 리액트앱 컨테이너에 추가하는 법

1. webpack.config.js에 remote 추가

remotes: {
chatApp: 'chatApp@http://localhost:3002/remoteEntry.js',
newApp: 'newApp@http://localhost:3003/remoteEntry.js', // 추가
},

2. types/remotes.d.ts에 타입 정의 추가

declare module 'newApp/SomeComponent' {
import { ComponentType } from 'react';
const SomeComponent: ComponentType;
export default SomeComponent;
}

3. App.tsx에서 사용

const NewComponent = React.lazy(() => import('newApp/SomeComponent'));

// Route에 추가
<Route path="/new" element={
<Suspense fallback={<div>Loading...</div>}>
<NewComponent />
</Suspense>
} />

4. 새 MFE 앱에서 expose 설정

새 앱의 webpack/rspack config에서:
exposes: {
'./SomeComponent': './src/components/SomeComponent'
}
