Quy trình sử dụng GIT trong dự án
git checkout develop
git checkout -b [PT-01]/[feat/fix]/xxxx
git add
git commit
git pull origin --rebase develop
git push origin [PT-01]/[feat/fix]/xxxx
Chú ý:
[PT-01] là mã ticket được assign khi làm.
-- Trong đó PT là viết tắt của tên project "Portal",
-- 01 là số thứ tự ticket được assign.
Quy tắc đặt tên.
Document

-- Đối với tên các Function sử dụng camelCase
--> example: onRefresh, onBackPress, onSubmit, renderItem

-- Đối với tên các Conponent sử dụng PascalCase
--> example: HomePage, SearchPage, DashBoardPage

-- Đối với tên các Constant sử dụng UPPERCASE
--> example: SECONDS, WIDTH, YEAR

-- Đối với các biến boolean sử dụng tiền tố 'is', 'are', 'has'
--> example: isAction, areEqual, hasEncryption
Quy tắc đặt tên branch.
-- Branch name convention: [UserName]/Task
--> example: thangtn/login
Quy tắc đặt tên commit
[ProjectName]-[TicketNumber]/[tille]/[content]
-ProjectName: PT
-TicketNumber : task trên azudevops
-tille :
-- feat: đây là 1 cái commit
-- fix: fix homeScreen sai UI
Initial types: 'feat', 'fix', 'refactor', 'revert'
-content: nội dung commnit
Quy trình chuyển task trong dự án
Document

1 Sprint sẽ trong 2 tuần

Daily meeting: Hằng ngày trong vòng 10-15p: báo cáo công việc và những vấn đề gặp phải

Tech Stack
React

NextJs

<!-- Document theme ---> detail function theme using

<!-- Clickup ---> manage task --> -->

Setup
Install the following
nvm

yarn

VS Code

ESlint

Make sure using Node.js version is 14

$ nvm install 14 && nvm use 14

Clone this repo

- git clone
- cd project && yarn && yarn start

Link
Admin https://iviec-inside.vercel.app
Figma https://www.figma.com/files/team/1143803997256806376/iVIEC-Design-Hub?fuid=706899021609054164
API Document https://sapi.iviec.vn/swagger/ui/index
Task

git remote set-url origin git@gitlab.com:ngocthang1493/iviec_inside.git

git remote set-url origin git@git.iviec.vn:iviec/inside-frontend.git
