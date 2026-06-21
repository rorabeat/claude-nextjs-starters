"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useCopyToClipboard } from "usehooks-ts"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { AlertCircle, Copy, Info } from "lucide-react"

const formSchema = z.object({
  name: z.string().min(2, "이름은 최소 2자 이상이어야 합니다."),
  email: z.string().email("유효한 이메일을 입력하세요."),
  subject: z.string().min(1, "주제를 선택해주세요."),
  subscribe: z.boolean(),
})

type FormValues = z.infer<typeof formSchema>

export default function Home() {
  const [, copy] = useCopyToClipboard()
  const [openDialog, setOpenDialog] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      subscribe: false,
    },
  })

  const subject = watch("subject")

  const onSubmit = async (values: FormValues) => {
    toast.success(`폼 제출 완료! ${values.name}님 환영합니다!`)
    reset()
  }

  const handleCopyInstall = async () => {
    const installCmd = "npm install"
    await copy(installCmd)
    toast.success("설치 명령어가 클립보드에 복사되었습니다!")
  }

  return (
    <div className="flex flex-col gap-12 py-12 px-4 max-w-5xl mx-auto">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Claude Next.js 스타터 킷
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Next.js 16, TypeScript, Tailwind CSS v4, shadcn/ui로 구축한 현대적이고 프로덕션 준비가 된 웹 스타터 템플릿입니다.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" variant="default">
            시작하기
          </Button>
          <Button size="lg" variant="outline">
            GitHub에서 보기
          </Button>
        </div>

        {/* Copy Install Command */}
        <div className="bg-muted/50 border border-border rounded-lg p-4 max-w-md mx-auto">
          <div className="flex items-center gap-2 justify-between">
            <code className="text-sm text-muted-foreground">npm install</code>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={handleCopyInstall}
                  className="h-8 w-8"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>설치 명령어 복사</TooltipContent>
            </Tooltip>
          </div>
        </div>
      </section>

      <Separator />

      {/* Form Section */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">폼 검증 데모</h2>
          <p className="text-muted-foreground mt-2">
            react-hook-form + Zod 검증 적용
          </p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>연락처 폼</CardTitle>
            <CardDescription>아래 폼을 작성하여 검증을 확인하세요.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">이름</Label>
                <Input
                  id="name"
                  placeholder="홍길동"
                  {...register("name")}
                  className={errors.name ? "border-destructive" : ""}
                />
                {errors.name && (
                  <p className="text-sm text-destructive">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">이메일</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  {...register("email")}
                  className={errors.email ? "border-destructive" : ""}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">주제</Label>
                <Select onValueChange={(value) => setValue("subject", value)} value={subject}>
                  <SelectTrigger id="subject" className={errors.subject ? "border-destructive" : ""}>
                    <SelectValue placeholder="주제를 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">일반 문의</SelectItem>
                    <SelectItem value="support">지원</SelectItem>
                    <SelectItem value="feedback">피드백</SelectItem>
                  </SelectContent>
                </Select>
                {errors.subject && (
                  <p className="text-sm text-destructive">{errors.subject.message}</p>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="subscribe"
                  {...register("subscribe")}
                />
                <Label htmlFor="subscribe" className="font-normal">뉴스레터 구독하기</Label>
              </div>

              <Button type="submit">제출</Button>
            </form>
          </CardContent>
        </Card>
      </section>

      {/* Status & Feedback Section */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">상태 & 피드백 컴포넌트</h2>
          <p className="text-muted-foreground mt-2">
            Alert, Badge, Avatar, Tooltip, Dialog 컴포넌트 활용
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">상태 예시</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">Shadcn</p>
                  <Badge variant="outline">활성</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">정보 알림</CardTitle>
            </CardHeader>
            <CardContent>
              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>알림!</AlertTitle>
                <AlertDescription>
                  이 스타터 킷은 프로덕션 사용에 준비되어 있습니다.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Dialog & Tooltip 예시</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
              <DialogTrigger asChild>
                <Button>Dialog 열기</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>작업 확인</DialogTitle>
                  <DialogDescription>
                    계속하시겠습니까? 이 작업은 취소할 수 없습니다.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex gap-2 justify-end">
                  <Button variant="outline" onClick={() => setOpenDialog(false)}>
                    취소
                  </Button>
                  <Button onClick={() => {
                    toast.success("작업이 확인되었습니다!")
                    setOpenDialog(false)
                  }}>
                    확인
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <AlertCircle className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                요소 위에 마우스를 올려 Tooltip을 확인하세요!
              </TooltipContent>
            </Tooltip>
          </CardContent>
        </Card>
      </section>

      {/* Tabs Section */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">Tabs 컴포넌트</h2>
          <p className="text-muted-foreground mt-2">
            다양한 콘텐츠 패널 간 전환
          </p>
        </div>
        <Card>
          <CardContent className="pt-6">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList>
                <TabsTrigger value="overview">개요</TabsTrigger>
                <TabsTrigger value="features">기능</TabsTrigger>
                <TabsTrigger value="docs">문서</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="mt-4">
                <p className="text-muted-foreground">
                  이것은 Next.js, TypeScript, Tailwind CSS로 몇 분 안에 시작할 수 있도록 설계된 현대적인 스타터 킷입니다.
                </p>
              </TabsContent>
              <TabsContent value="features" className="mt-4">
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Next.js 16 App Router</li>
                  <li>TypeScript로 타입 안전성</li>
                  <li>Tailwind CSS v4 다크모드 지원</li>
                  <li>shadcn/ui 컴포넌트</li>
                  <li>Zod를 사용한 폼 검증</li>
                  <li>sonner를 사용한 토스트 알림</li>
                </ul>
              </TabsContent>
              <TabsContent value="docs" className="mt-4">
                <p className="text-muted-foreground">
                  README.md 파일에서 폴더 구조, 새 컴포넌트 추가 방법, 테마 설정 가이드를 확인하세요.
                </p>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </section>

      {/* Accordion Section */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">FAQ 섹션</h2>
          <p className="text-muted-foreground mt-2">
            Accordion 컴포넌트로 자주 묻는 질문 답변
          </p>
        </div>
        <Card>
          <CardContent className="pt-6">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>어떤 기술들이 포함되어 있나요?</AccordionTrigger>
                <AccordionContent>
                  이 스타터 킷에는 Next.js 16, React 19, TypeScript, Tailwind CSS v4, shadcn/ui 컴포넌트, react-hook-form, zod, sonner, usehooks-ts가 포함되어 있습니다.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>더 많은 컴포넌트를 어떻게 추가하나요?</AccordionTrigger>
                <AccordionContent>
                  `npx shadcn@latest add &lt;컴포넌트-이름&gt;`을 실행하세요. CLI가 설치와 구성을 처리합니다. shadcn/ui 문서에서 사용 가능한 컴포넌트를 확인하세요.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>테마를 커스터마이징할 수 있나요?</AccordionTrigger>
                <AccordionContent>
                  네! 테마 구성은 `app/globals.css`에서 CSS 변수와 Tailwind의 `@theme` 지시문을 사용합니다. 라이트와 다크 모드 색상이 모두 정의되어 있습니다.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
