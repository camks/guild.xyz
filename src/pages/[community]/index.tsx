import { Icon, Stack, Text } from "@chakra-ui/react"
import { useWeb3React } from "@web3-react/core"
import Card from "components/common/Card"
import Layout from "components/common/Layout"
import ActionCard from "components/[community]/common/ActionCard"
import { CommunityProvider } from "components/[community]/common/Context"
import Pagination from "components/[community]/common/Pagination"
import { Info } from "phosphor-react"
import type { Community } from "temporaryData/communities"

type Props = {
  communityData: Community
}

const CommunityPage = ({ communityData }: Props): JSX.Element => {
  const { account } = useWeb3React()

  return (
    <CommunityProvider data={communityData}>
      <Layout
        title={communityData.name}
        description={communityData.description || communityData.name}
        imageUrl={`${
          communityData.imageUrl.includes("assets.coingecko.com")
            ? communityData.imageUrl.replace("small", "large")
            : communityData.imageUrl
        }`}
      >
        <Stack spacing={{ base: 7, xl: 9 }}>
          <Pagination
            editBtnUrl={
              account?.toLowerCase() === communityData.owner?.address && `admin`
            }
          />
          <Stack spacing={{ base: 7 }}>
            <ActionCard
              title="About"
              description={communityData.description || "No description"}
            />
            <Card p="6" isFullWidthOnMobile>
              <Text
                fontWeight="medium"
                colorScheme="gray"
                display="flex"
                alignItems="center"
              >
                <Icon as={Info} mr="4" />
                More info coming soon
              </Text>
            </Card>
          </Stack>
        </Stack>
      </Layout>
    </CommunityProvider>
  )
}

export {
  getStaticPaths,
  getStaticProps,
} from "components/[community]/utils/dataFetching"

export default CommunityPage